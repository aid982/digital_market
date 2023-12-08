import { CollectionConfig } from "payload/types";

export const Users:CollectionConfig = {
    slug:"users",
    auth:{
        verify:{
            generateEmailHTML:({user,token})=>{
                return `<a href='${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}'>Hello please verify</a>`;
            }
        }
    },
    access:{
        read:()=>true,
        create:()=>true
    },
    fields:[
        {
            name:'role',
            required:true,
            defaultValue:'user',
            admin:{
                 condition:({req})=>{
                   // if(req.user.role==="admin")  return true
                    return true

                 }
            },
            type:'select',
            options:[
                {label:"Admin",value:"admin"},
                {label:"Seller",value:"seller"},
                {label:"User",value:"user"},
            ]
            


        },

    ],
}