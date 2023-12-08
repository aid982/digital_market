import { PRODUCT_CATEGORIES } from "../../config";
import { CollectionConfig } from "payload/types";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  auth: {
    verify: {
      generateEmailHTML: ({ user, token }) => {
        return `<a href='${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}'>Hello please verify</a>`;
      },
    },
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      required: true,
      relationTo: "users",
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: "name",
      type: "text",
      label: "Name",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "description",
    },
    {
      name: "price",
      type: "number",
      label: "Price in USD",
      min: 0,
      required: true,
    },
    {
      name: "category",
      type: "select",
      label: "Category",
      options: PRODUCT_CATEGORIES.map(({ label, value }) => ({ label, value })),
      required: true,
    },
  /*  {
      name: "product files",
      type: "relationship",
      label: "Products files",
      required: true,
      relationTo: "product_files",
      hasMany: false,
    },*/
    {
      name: "approvedForSale",
      type: "select",
      label: "Approved for Sale",
      access: {
        create: ({ req }) => req.user.role === "admin",
        update: ({ req }) => req.user.role === "admin",
      },
      options: [
        { label: "Pending verification", value: "Pending" },
        { label: "Approved", value: "Approved" },
        { label: "Denied", value: "Denied" },
      ],
    },
    {
      name: "stripeId",
      access: {
        create: () => false,
        update: () => false,
        read: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "priceId",
      access: {
        create: () => false,
        update: () => false,
        read: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "images",
      type: "array",
      label: "Product images",
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: "Image",
        plural: "Images",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};
