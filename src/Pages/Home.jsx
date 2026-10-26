import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RecipeCard from '../Components/RecipesCard';

// const dummyRecipes = [
//   {
//     id: 1,
//     name: 'Margherita Pizza',
//     image: '/images/recipe-1.svg',
//     cuisine: 'Italian',
//     difficulty: 'Easy',
//     rating: 4.8,
//     prepTimeMinutes: 20,
//     cookTimeMinutes: 15,
//   },
//   {
//     id: 2,
//     name: 'Vegetable Stir-Fry',
//     image: '/images/recipe-2.svg',
//     cuisine: 'Asian',
//     difficulty: 'Easy',
//     rating: 4.6,
//     prepTimeMinutes: 15,
//     cookTimeMinutes: 10,
//   },
//   {
//     id: 3,
//     name: 'Chocolate Chip Cookies',
//     image: '/images/recipe-3.svg',
//     cuisine: 'American',
//     difficulty: 'Medium',
//     rating: 4.9,
//     prepTimeMinutes: 15,
//     cookTimeMinutes: 12,
//   },
//   {
//     id: 4,
//     name: 'Chicken Alfredo Pasta',
//     image: '/images/recipe-4.svg',
//     cuisine: 'Italian',
//     difficulty: 'Medium',
//     rating: 4.7,
//     prepTimeMinutes: 15,
//     cookTimeMinutes: 20,
//   },
//   {
//     id: 5,
//     name: 'Mango Lassi',
//     image: '/images/recipe-5.svg',
//     cuisine: 'Indian',
//     difficulty: 'Easy',
//     rating: 4.9,
//     prepTimeMinutes: 10,
//     cookTimeMinutes: 0,
//   },
//   {
//     id: 6,
//     name: 'Caprese Salad',
//     image: '/images/recipe-6.svg',
//     cuisine: 'Italian',
//     difficulty: 'Easy',
//     rating: 4.5,
//     prepTimeMinutes: 10,
//     cookTimeMinutes: 0,
//   },
// ];

function Home() {
const [recipes,setRecipes]=useState([]);
const [total,setTotal]=useState(0);
const [loading, setLoading] = useState(false);
const [errorMsg, setErrorMsg] = useState("");  
const[searchQuery,setSearchQuery]=useState("")


  async function fetchRecipe(skipCount,query) {
    setLoading(true);
    try {
      let url = `https://dummyjson.com/recipes?limit=6&skip=${skipCount}`;
if(query){
  url=`https://dummyjson.com/recipes/search?limit=6&skip=${skipCount}&q=${query}`;
}
      const { data } = await axios.get(url);
      setRecipes((prev) => 
        skipCount==0? data.recipes: [...prev, ...data.recipes]);
      setTotal(data.total);
    } catch (error) {
setErrorMsg("Please try again later.");
    }
setLoading(false);
  }
  useEffect(() => {
    fetchRecipe(0);
  }, []);

  function handleSearch(e){
    e.preventDefault();

    const form=new FormData(e.target);
    let query=form.get("query").trim();
 setSearchQuery(query);
  //  if(query){
      fetchRecipe(0,query)
    //}
  }
// if(loading){
//   return <p className='text-center py-6 text-muted'>Loading...</p>;

// }
if(errorMsg){
  return(
    <main className='max-w-6xl mx-auto px-4 py-8'>
      <p className='text-accent text-center'>{errorMsg}</p>
    </main>
  )
}



  return (
    <main className="max-w-6xl mx-auto px-4 py-8">

      <form className="flex gap-2 max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search recipes..."
          className="flex-1 border border-border rounded px-3 py-2 bg-card text-text outline-none focus:border-accent"
        />
        <button type="submit" 
        className="bg-accent hover:bg-accent-hover text-white rounded px-4 py-2 font-medium">
          Search
        </button>
      </form>

{
  loading &&
   <p className='text-center py-6 text-muted'>Loading...</p>
}



{ !loading && recipes.length===0 && <p className="text-center py-6 text-muted">No recipe found for `${searchQuery}`</p>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes?.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
{
recipes?.length < total && 
<div className="text-center mt-8">
        <button
          type="button"
          onClick={()=>fetchRecipe(recipes.length,searchQuery)}
          className="bg-accent hover:bg-accent-hover text-white rounded px-6 py-2 font-medium"
        >
          Load More
        </button>
      </div>
    
}
    </main>
  );
}

export default Home;












// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import RecipeCard from '../Components/RecipesCard';

// function Home() {
//   const [recipes, setRecipes] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(false); // लोडिंग स्टेट जोड़ी
//   const [errorMsg, setErrorMsg] = useState("");   // एरर स्टेट जोड़ी

//   async function fetchRecipe(skipCount = 0) {
//     try {
//       setLoading(true);
//       setErrorMsg("");
      
//       const { data } = await axios.get(`https://dummyjson.com/recipes?limit=6&skip=${skipCount}`);
//       console.log(data); // कंसोल में चेक करें कि data.recipes आ रहा है

//       // 1. फिक्स: 'data.recipe' को बदलकर 'data.recipes' किया
//       if (data && data.recipes) {
//         setRecipes((prev) => {
//           const currentRecipes = Array.isArray(prev) ? prev : [];
//           return [...currentRecipes, ...data.recipes];
//         });
//       }

//       if (data?.total !== undefined) {
//         setTotal(data.total);
//       }
//     } catch (error) {
//       console.error(error);
//       setErrorMsg("रेसिपी लोड करने में समस्या आ रही है।");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchRecipe(0);
//   }, []);

//   return (
//     <main className="max-w-6xl mx-auto px-4 py-8">
//       {/* सर्च फॉर्म */}
//       <form className="flex gap-2 max-w-md mx-auto mb-8">
//         <input
//           type="text"
//           placeholder="Search recipes..."
//           className="flex-1 border border-border rounded px-3 py-2 bg-card text-text outline-none focus:border-accent"
//         />
//         <button type="button" className="bg-accent hover:bg-accent-hover text-white rounded px-4 py-2 font-medium">
//           Search
//         </button>
//       </form>

//       {/* एरर मैसेज */}
//       {errorMsg && <p className="text-center text-accent mb-4">{errorMsg}</p>}

//       {/* रेसिपी ग्रिड */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {recipes.map((recipe) => (
//           <RecipeCard key={recipe.id} recipe={recipe} />
//         ))}
//       </div>

//       {/* लोडिंग इंडिकेटर */}
//       {loading && <p className="text-center py-4 text-muted">Loading recipes...</p>}

//       {/* लोड मोर बटन */}
//       {!loading && recipes.length < total && (
//         <div className="text-center mt-8">
//           <button
//             type="button"
//             onClick={() => fetchRecipe(recipes.length)} // अगली बैच के लिए वर्तमान संख्या को स्किप करेगा
//             className="bg-accent hover:bg-accent-hover text-white rounded px-6 py-2 font-medium"
//           >
//             Load More
//           </button>
//         </div>
//       )}
//     </main>
//   );
// }

// export default Home;
