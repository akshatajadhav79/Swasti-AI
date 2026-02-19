import React,{useState} from 'react'

const AddFruitForm = ({addFruit})=> {

    const[fruitName,setFruiteName] = useState('');

    const handleSubmit=(event)=>{
        event.preventDefault();
        if(fruitName){
            addFruit(fruitName);
            setFruiteName('');
        }
    };
  return (
    <form onSubmit={handleSubmit}>
        <input type='text'
        value={fruitName}
        onChange={(e)=>setFruiteName(e.target.value)}
        placeholder='Enter fruit name'/>
        <button type='submit'>Add Fruit</button>
    </form>
  );
};

export default AddFruitForm