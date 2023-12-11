
import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { User } from "../../payload-types";

import { Access, CollectionConfig } from "payload/types";

export const addUser:BeforeChangeHook = ({req,data})=>{
    const user = req.user as User |null
    return {...data,user:user?.id}
}

const youOwnOrPurchased:Access =async ({req}) => {
    const user = req.user as User |null
    if(user?.role==="admin") return true
    if(!user) return false;
    const {docs:products} = await req.payload.find({
        collection:"products",
        depth:0,
        where:{
            user:{
                equals:user.id
            }
        }
        
    });
    const ownProductFilesID = products.map((product)=>(typeof product.productFile ==="string" ? product.productFile: product.productFile.id))
    console.log('ownProductFilesID',ownProductFilesID)

    const {docs:orders} = await req.payload.find({
        collection:"orders",
        depth:2,
        where:{
            user:{
                equals:user.id
            }
        }
        
    });

    const  purchusedProductFilesIds = orders.map((order)=>{
        return order.products.map((product)=>{
            if( typeof product === "string") return req.payload.logger.error('Search depth not sufficient to find product id')
            return typeof product.productFile ==="string" ? product.productFile: product.productFile.id
        })
    }).filter(Boolean).flat() 

    return {
        id: {
            in:[...ownProductFilesID,...purchusedProductFilesIds]
        }
    }
    
}

export const ProductFiles:CollectionConfig = {
    slug:"productFile",
    admin:{
        hidden: ({user})=>(user.role!=='admin')
    },
    hooks:{
        beforeChange:[
            addUser,            

        ]
    },
    access:{
        read: youOwnOrPurchased,
        update: ({req})=>req.user.role==='admin',
        delete: ({req})=>req.user.role==='admin',
    },
    upload:{
        staticURL:"/product_files",
        staticDir:"product_files",
        mimeTypes:["image/*","fonts/*"],

    },
    fields:[
        {
            name:"user",
            type:"relationship",
            relationTo:"users",
            admin:{
                condition:()=>false
            },
            hasMany:false,
            required:true
        }

    ]
}