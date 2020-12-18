import React, { useEffect, useState } from 'react'
import '../../assets/styles/Product.css';
import axios from 'axios';
import Input from '../common/Input';
import PopupProduct from '../common/PopupProduct';
import Spinner from '../common/Spinner'


const Product = () => {

    
    const [product,setProduct]=  useState(null)
    const [loaded,setLoaded] = useState(false)
    const [search,setSearch]= useState("")
    const [searchResult,setSearchResult]= useState([])
    const [description,setDescription]= useState(false)
    const [priceOption,setPriceOption] = useState("")
    const [currentProduct,setCurrentProduct] = useState("")
    const [isProduct,setIsProduct] = useState(false)
    const [count,setCount] = useState(1)

        useEffect(() => {
            const apiUrl = "https://hplussport.com/api/products/order/price/sorc/qty/100"
             fetch(apiUrl)
          
              .then(res =>{ return res.json()})
              .then(data => {
                setProduct(data)
                  console.log("d",data.name)
                  let name = data.forEach(data=>{return data.name})
                  console.log("huhu",name)
                setSearchResult(data.filter(itm=>(itm.name.toLowerCase().includes(search.toLowerCase()))||(itm.price.includes(search))))
               
                setLoaded(true)
                
                
              })
          },[search,setSearchResult,setPriceOption]);
                
       
    
    console.log("kikikii",searchResult)
    console.log("pr",product)
    console.log(search)
    const toggleDescription = (id)=>{
        setDescription(!description)
        console.log(id)
    }
    const sortPrice = (value) =>{
        if (value ==='lowtoHigh'){
            setPriceOption('lowtoHigh')
            console.log("here low")
            const lth = searchResult.reverse();
            setSearchResult(lth);
            console.log("dshjdbs",lth)
            setCount(2)
        }
        if(value ==='hightoLow'){
            if(count==1){
                setSearchResult(searchResult)
            }
            else if(count==2){
                setPriceOption('hightoLow')
                console.log("here high")
                setSearchResult(searchResult.reverse());

            }
        }  

    }
    const currentProductHandler=(item)=>{
        setCurrentProduct(item)
        setIsProduct(true)
    }
    const toggleProduct = ()=>{
        setIsProduct(false)
    }
    console.log(priceOption)
    return(
    <>
    {isProduct?(<PopupProduct content={<> <h3 className='productPopupHeading'>{currentProduct.name} - ${currentProduct.price} </h3>
                                    <img src={currentProduct.image} alt={currentProduct.image_title} className='productPopupImage'/>
                                    <p className='productPopupDescription'>{currentProduct.description}</p>
                                    <p className="price"></p><div className='logout-buttons'>
                                         <button onClick={toggleProduct} className='buttonProductCancel' id='red'>Cancel</button>
                        </div> </>}/>):null}
    <div className="productHeader">
        <div className='productHeader-left'>
            <input type="text" placeholder=" &#xF002; Search for Name and Price" className="productSearch fontAwesome" value={search} onChange={(e)=>setSearch(e.target.value)}/>
        </div>
        <div className='productHeader-right'>
                            <select name='filter' className='productSelect' onChange={(e)=>sortPrice(e.target.value)}>
                                <option>Filter</option>
                                <option value='lowtoHigh'>Low to High</option>
                                <option value='hightoLow'>High to Low</option>
                            </select>   
        </div>
        
    </div>
    <div className="product">
        {loaded?(
            searchResult.map(item=>
            <div className="card" key={item.id}>
                <img src={item.image} alt={item.image_title} style={{width:"90%"}}/>
                <h3>{item.name}</h3>
                <p className="price">${item.price}</p>
                <p><button onClick={()=>currentProductHandler(item)}> Show Details</button></p>  
            </div>
            )
        ):<Spinner/>
        }
        {searchResult=="" && loaded?(<p className="productNotFound">OOOOPS Item not Found !!!!</p>):null}
    </div>
    </>
    
)
       
}

export default Product


