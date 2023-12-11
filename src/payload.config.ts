import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from "@payloadcms/bundler-webpack";
import path from "path";
import { Users } from "./collections/Users";
import dotenv from "dotenv"
import { Products } from "./collections/Products/Products";
import { Media } from "./collections/Products/Media";
import { ProductFiles } from "./collections/Products/ProductFile";
import { Orders } from "./collections/orders";

dotenv.config({
    path:path.resolve(__dirname,"../.env")
})



export default buildConfig({
    serverURL:process.env.NEXT_PUBLIC_SERVER_URL||'',
    collections:[Users,Products,Media,ProductFiles,Orders],
    routes:{
        admin:'/sell'
    },
    admin:{
        user:"users",
        bundler:webpackBundler(),
        meta:{           
            
        },
       
    },
    rateLimit:{
        max:2000

    },
    editor: slateEditor({}),
    db: mongooseAdapter({
        // Mongoose-specific arguments go here.
        // URL is required.
        url: process.env.DATABASE_URI!,
      }),
      typescript:{
        outputFile:path.resolve(__dirname,"payload-types.ts")
      }

})