
import { PRODUCT_CATEGORIES } from "../../config";
import { CollectionConfig } from "payload/types";
import { User } from "../../payload-types";
import { BeforeChangeHook } from "payload/dist/collections/config/types";


export const addUser:BeforeChangeHook = ({req,data})=>{
  console.log('data',data)
  const user = req.user as User |null
  return {...data,user:user?.id}
}


export const Products: CollectionConfig = {
  slug: "products",
  hooks: {
    beforeChange: [addUser],
  },
  admin: {
    useAsTitle: "name",
  }, 
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [   
    {
      name: "name",
      type: "text",
      label: "Name",
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      required: true,
      relationTo: "users",
      hasMany: false,
      admin: {        
        condition:()=>false,        
      },
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
    {
      name: "productFile",
      type: "relationship",
      label: "Products file",
      required: true,
      relationTo: "productFile",
      hasMany: false,
    },
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
