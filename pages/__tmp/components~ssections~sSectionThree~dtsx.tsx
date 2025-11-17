
import { useEffect, useState } from "react";

export default function ComponentPreview(){

    const [error,setError]=useState('');
    const [Component,setComponent]=useState<{Comp:((...props:any[])=>any)|null}>({Comp:null});

    useEffect(()=>{
        setError('');
        let m=true;
        (async ()=>{
            try{
                const mod:any=await import('@/components/sections/SectionThree');
                if(!m){
                    return;
                }
                let found=false;
                for(const e in mod){
                    const c=mod[e];
                    if(typeof c === 'function'){
                        found=true;
                        setComponent({Comp:c});
                        break;
                    }
                }
                if(!found){
                    setError('No component found in import - @/components/sections/SectionThree')
                }
            }catch(ex){
                if(m){
                    setError(`Unable to load component - ${(ex as any)?.message}`);
                }
            }
        })();
    },[]);

    return error?error:Component.Comp?<Component.Comp/>:'...Loading Component';

}

