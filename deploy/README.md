# Deploiement Production Avec Domaine Et HTTPS

Ce dossier contient la configuration de production pour l'instance EC2.

## Prerequis DNS

1. Acheter ou utiliser un domaine.
2. Associer une Elastic IP a l'instance EC2.
3. Creer un enregistrement DNS `A`:

```text
trustshop.example.com -> Elastic IP de l'instance EC2
```

4. Renseigner `TRUSTSHOP_DOMAIN` et `CERTBOT_EMAIL` dans `deploy/.env`.

## Ports A Ouvrir

- `80/tcp`: HTTP, challenge Let's Encrypt et redirection vers HTTPS.
- `443/tcp`: HTTPS public.
- `22/tcp`: SSH uniquement depuis l'IP autorisee, jamais `0.0.0.0/0`.
- `3000/tcp`: port interne Docker seulement, non publie publiquement.

## Premier Certificat Let's Encrypt

La configuration HTTPS finale a besoin de certificats deja presents. Pour le premier
certificat, lancer Nginx en HTTP uniquement:

```bash
cd /opt/trustshop/deploy
docker compose -f docker-compose.prod.yml -f docker-compose.certbot-bootstrap.yml up -d web nginx
docker compose -f docker-compose.prod.yml --profile certbot run --rm certbot certonly \
  --webroot \
  --webroot-path /var/www/certbot \
  --email "$CERTBOT_EMAIL" \
  --agree-tos \
  --no-eff-email \
  -d "$TRUSTSHOP_DOMAIN"
docker compose -f docker-compose.prod.yml up -d --remove-orphans
```

Tester ensuite:

```bash
curl -I "https://$TRUSTSHOP_DOMAIN"
```

## Renouvellement Du Certificat

Le renouvellement peut etre teste avec:

```bash
docker compose -f docker-compose.prod.yml --profile certbot run --rm certbot renew --dry-run
```

Pour automatiser le renouvellement sur EC2, ajouter une tache cron systeme:

```cron
0 3 * * * cd /opt/trustshop/deploy && docker compose -f docker-compose.prod.yml --profile certbot run --rm certbot renew --quiet && docker compose -f docker-compose.prod.yml exec nginx nginx -s reload
```

## GitHub Actions Sans SSH Ouvert A Tous

Configurer dans GitHub:

Variables:

- `EC2_DEPLOY=true`
- `EC2_DEPLOY_PATH=/opt/trustshop/deploy`
- `EC2_SECURITY_GROUP_ID=sg-xxxxxxxxxxxxxxxxx`
- `AWS_REGION=eu-west-3` ou la region de l'instance

Secrets:

- `EC2_HOST`
- `EC2_USER`
- `EC2_SSH_KEY`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

Le workflow recupere l'IP publique temporaire du runner GitHub Actions, autorise
uniquement cette IP en `/32` sur le port `22`, lance le deploiement, puis supprime la
regle SSH a la fin du job.
