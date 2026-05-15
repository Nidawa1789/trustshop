import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const addressType = defineType({
  name: "address",
  title: "Adresses",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "name",
      title: "Adresse Name",
      type: "string",
      description: "Nom de l'adresse",
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: "email",
      title: "User Email",
      type: "email",
    }),
    defineField({
      name: "address",
      title: " Addresse de la cité",
      description: "The street address including appartement/unit number",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(100),
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "state",
      title: "State",
      type: "string",
      description: "Two letter state code (e.g. NY, CA, TX)",
      validation: (Rule) => Rule.required().length(2).uppercase(),
    }),
    defineField({
      name: "zip",
      title: "Zip Code",
      type: "string",
      description: "Format: 12345 ou 12345-1234",
      validation: (Rule) =>
        Rule.required()
          .regex(/^\d{5}(-\d{4})?$/, {
            name: "zipCode",
            invert: false,
          })
          .custom((zip: string | undefined = undefined) => {
            if (!zip) {
              return "Zip code is required";
            }
            if (!zip.match(/^\d{5}(-\d{4})?$/)) {
              return "Zip code must be in the format 12345 or 12345-1234";
            }
            return true;
          }),
    }),
    defineField({
      name: "default",
      title: "Default Address",
      type: "boolean",
      description: "Is the default shipping address?",
      initialValue: false,
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "address",
      city: "city",
      state: "state",
      isDefault: "default",
    },
    prepare(selection) {
      const { title, subtitle, city, state, isDefault } = selection;
      return {
        title: `${title} - ${isDefault ? "Default" : ""}`,
        subtitle: `${subtitle}, ${city}, ${state}`,
      };
    },
  },
});
