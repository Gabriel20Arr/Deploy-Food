import React, {useState} from 'react';

import style from "./Steps.module.css"

export default function Step({steps,id}) {

    const [stepx,setStepx]=useState({
        id:id,
        step:'',
        ingredients:[],
        equipments: []
    })

    const [eqIn,setEqIn]=useState({
        ingredient:'',
        equipment:''
    });

    const [click,setClick]=useState(0);

    const handlerChangeStep = (e)=>{
        const {value}=e.target;
        setStepx({...stepx,step:value})
    };
    const addEqipOrIng =(e)=>{
        const {value,name}=e.target;
        setEqIn({...eqIn,[name]:value})
    };
    const addEqipment = (e)=>{
        e.preventDefault();
        setStepx({...stepx,equipments:[...stepx.equipments,eqIn.equipment]});
        setEqIn({...eqIn,
            equipment:''
        })
    };
    
    const addIngredint = (e)=>{
        e.preventDefault();
        setStepx({...stepx,ingredients:[...stepx.ingredients,eqIn.ingredient]});
        setEqIn({...eqIn,
            ingredient:''
        })
    };

    const addStep = (e)=>{
        e.preventDefault();
        steps(stepx);
        setClick(1);
        setStepx({
            id:id,
            step:'',
            ingredients:[],
            equipments: []
        });
    };

  return (
    <div >
      <input className={style.step} type="text" onChange={handlerChangeStep} value={stepx.step}/>
        <div className={style.equip} >
            {/* <label htmlFor="">Equipment: </label> */}
            <input  placeholder='Enter Equipment' type="text" onChange={addEqipOrIng} name='equipment' value={eqIn.equipment}/>
            <button className={style.add} onClick={(e)=>addEqipment(e)} >add</button>
        </div>
        <div className={style.Ingre} >
            {/* <label htmlFor="">Ingredienet: </label> */}
            <input placeholder='Enter Ingredienet'  type="text" onChange={addEqipOrIng} name='ingredient' value={eqIn.ingredient}/>
            <button className={style.add} type='submit' onClick={addIngredint} >add</button>
        </div>
            
        {click||!stepx.step?null:<button className={style.Listo} onClick={addStep}>Listo</button>}
    </div>
  )
}
 