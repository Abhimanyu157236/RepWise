import React,{useState,useEffect} from 'react';
import { PlusCircle,Search, Trash2, Check} from "lucide-react";
import TotalMacroChart from '../components/TotalMacroChart';
import {motion} from 'framer-motion'
import {account ,databases, ID } from "../../service/appwrite";
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Food = () => {

  const { user } = useAuth();
  const navigate = useNavigate();
  const [foodInput, setFoodInput] = useState("");
  const [food,setFood] = useState([]);
  const [FetchedFood, setFetchedFood] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [showPopup,setShowPopup] = useState(false)
  let totalCal = 0
  let totalProt = 0
  let totalFat = 0
  let totalCarbs = 0
  let totalFibre = 0

  const addFoodItem = () => {
    setFoodInput("");
    setFood((prevFetchedFood) => [...prevFetchedFood, ...FetchedFood.items]);
    setLoaded(false);

  };

  const removeFoodItem = (item) => {
    setFood(food.filter((i) => i !== item));
  };

  async function getFoodData(food) {
  const res = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(food)}`, {
    headers: { 'X-Api-Key': 'Zb10R0afYpre65DA7OlzZbhr0c7m3LPERP9NJpTc'}
  });
  setFetchedFood(await res.json());
  setLoaded(true);
}

const saveMealsToDB = async() => {

     const User = await account.get()

     try {
      const response = await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_MEALS_ID,
        ID.unique(),{
           userId: User.$id,
           date : new Date().toISOString(),
           calories : totalCal,
           carbohydrates : totalCarbs,
           protien : totalProt,
           fats : totalFat,
           fiber : totalFibre
        }
      )
      setShowPopup(true)
      return response

     } catch (error) {
      console.log(error)
     }
}

    if(showPopup){
       setTimeout(() => {
          setShowPopup(false)
        },1500);
        
    }

  return (
   <div className='w-full h-screen overflow-y-scroll bg-black text-white py-10 '>

    <div className='mt-8'>
       <motion.h1
      className="lg:text-6xl text-4xl font-bold white text-center"
      style={{ color: ["#A7C7E7"] }}
      animate={{ opacity: [1, 0] }}
      transition={{
        duration: 1.7,       
        repeat: Infinity,   
        repeatType: "mirror" 
        
      }}
    >
       EatWise
      <p className="text-center text-sm lg:text-2xl lg:mt-4 mt-2 font-extralight">
       {user ? "Measure. Manage. Master your meals" : "Login to track meals"}
      </p>
    </motion.h1>

      <div  className={`w-[30%] lg:w-1/12 flex bg-white rounded-lg py-1 px-4 border-b-8 border-[#2b5c0a] fixed top-[15%] lg:top-[25%] left-[1%] lg:left-[2%] ${showPopup ?"block":"hidden"}`}>
       <Check size={25} color="#2b5c0a" strokeWidth={4} className="mt-2"/>
        <h1 className="text-md lg:text-xl font-semibold py-1 text-[#2b5c0a] ml-2 ">
          Saved
        </h1>
     </div>

    </div>
    { user ? 
      <div className='lg:py-20 lg:flex justify-around w-full'>
    <div className="w-[100%] lg:w-[40%] mx-auto bg-black p-4">
      <div className=" mx-auto backdrop-blur-lg bg-gradient-to-br from-gray-900/60 via-gray-800/50 to-gray-900/60 border border-white/10 rounded-2xl shadow-lg p-6">
        
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          🍽 Food Tracker
        </h1>

        {/* Input Section */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter food item..."
            className="lg:flex-1 w-[60%] rounded-lg px-4 py-2 bg-gray-800/60 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-white/10"
            value={foodInput}
            onChange={(e) => setFoodInput(e.target.value)}
          />
          
           <button className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 lg:py-4 py-2 rounded-lg transition font-medium"
           onClick={()=>getFoodData(foodInput)}>
            <Search size={18} />
          </button>
          <button className={`flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-2 lg:py-4 py-2 rounded-lg transition font-medium ${!loaded? "hidden" : "block"}`}
          onClick={addFoodItem}
          disabled={FetchedFood == ""}>
            <PlusCircle size={18} />
          </button>
        </div>
      <div>
      <ul className="space-y-3">
        {
        food.map((foodItem, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-800/70 border border-white/10 p-3 rounded-lg shadow-sm">
          <span className="text-white text-lg mx-3 break-words flex flex-col">{foodItem?.serving_size_g}g  {foodItem?.name}
           <span className='flex justify-evenly '>
             <span className='py-1 px-2 my-2 mx-1 border-2 border-gray-700 rounded-lg text-sm font-extralight'>Kcal : {foodItem?.calories || 0}</span>
            <span className='py-1 px-2 my-2 mx-1 border-2 border-gray-700 rounded-lg text-sm font-extralight hidden lg:block'>protien : {foodItem?.protein_g || 0}g</span>
            <span className='py-1 px-2 my-2 mx-1 border-2 border-gray-700 rounded-lg text-sm font-extralight hidden lg:block'>carbs : {foodItem?.carbohydrates_total_g || 0}g</span>
            <span className='py-1 px-2 my-2 mx-1 border-2 border-gray-700 rounded-lg text-sm font-extralight hidden lg:block'>fats : {foodItem?.fat_total_g || 0}g</span>
            <span className='py-1 px-2 my-2 mx-1 border-2 border-gray-700 rounded-lg text-sm font-extralight hidden lg:block'>fiber : {foodItem?.fiber_g || 0}g</span>
           </span>
          </span>
          <button className="text-red-400 hover:text-red-600 transition"  
          onClick={() => removeFoodItem(foodItem)}>
            <Trash2 size={18} />
          </button>
        </li>
          ))
        }
      </ul>
    </div>
      <button className="mt-4 w-1/3 lg:w-1/5 flex items-center justify-center gap-2 bg-gradient-to-r from-[#cbcaa5] to-[#334d50] text-black font-semibold p-3 rounded-lg hover:opacity-90 transition"
        onClick={saveMealsToDB}  
          >
            Save
          </button>
    </div>
    </div>
    
 <div className={`w-[100%] lg:w-[40%] mx-auto bg-black p-4 ${food.length > 0?"block":"hidden"}`}>
  <div className=" mx-auto lg:flex backdrop-blur-lg bg-gradient-to-br from-gray-900/60 via-gray-800/50 to-gray-900/60 border border-white/10 rounded-2xl shadow-lg p-6">
    <div>
      <h1 className="text-3xl font-bold text-center text-white mb-10">
          Total Calories Consumed
          </h1>
           {
            food.map((item) => {
              totalCal += item.calories || 0;
              totalProt += item.protein_g || 0;
              totalCarbs += item.carbohydrates_total_g || 0;
              totalFat += item.fat_total_g || 0;
              totalFibre += item.fiber_g || 0;
            })
           }
           <h1 className='text-xl my-1 mx-3'><b>Calories :</b> {totalCal.toFixed(1)}</h1>
           <h1 className='text-xl my-1 mx-3'><b>Protein :</b> {totalProt.toFixed(1)} g</h1>
           <h1 className='text-xl my-1 mx-3'><b>Carbs :</b> {totalCarbs.toFixed(1)} g</h1>
           <h1 className='text-xl my-1 mx-3'><b>Fat :</b> {totalFat.toFixed(1)} g</h1>
           <h1 className='text-xl my-1 mx-3'><b>Fiber :</b> {totalFibre.toFixed(1) } g</h1>
    </div>
           <div className='my-20 lg:my-24 flex justify-center'>
             <TotalMacroChart
               totalCal={totalCal}
               totalProt={totalProt}
               totalCarbs={totalCarbs}
               totalFat={totalFat}
             />
           </div>
  </div>
</div>
</div>
:
<div className="w-full flex justify-center">
      <button className="w-1/2 lg:w-[13%] rounded-lg py-2 text-xl lg:text-2xl font-semibold my-14 bg-[#ff3434]"
     onClick={()=>navigate('/login')}
     >
        Login
      </button>
      </div>
      }
</div>
  );
}

export default Food;

