"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { ReactHTMLElement, useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/outside-hook";


const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const isAnyOpen = activeIndex !== null
  const ref = useRef<HTMLDivElement|null>(null);

  useOnClickOutside(ref,()=>{
    setActiveIndex(null);
  });

  useEffect(() => {
    const handler = (e:KeyboardEvent)=>{
      if(e.key ==='Escape'){
        setActiveIndex(null);
      }

    }  
    document.addEventListener("keydown",handler)
    return ()=>{
      document.removeEventListener("keydown",handler)
    }
  }, [])
  
  return (
    <div ref={ref} className="flex gap-4 h-full">
      {PRODUCT_CATEGORIES.map((category, i) => {
        const handleOpen = () => {         
          
          if (activeIndex === i) {
            setActiveIndex(null);
          } else {
            setActiveIndex(i);
          }
        };
        const isOpen = i === activeIndex;

        return (
          <NavItem
            key={i}
            category={category}
            handleOpen={handleOpen}
            isAnyOpen={isAnyOpen}
            isOpen={isOpen}
          />
        );
      })}
    </div>
  );
};

export default NavItems;
