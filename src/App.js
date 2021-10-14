import './App.css';
import { useEffect, useState } from 'react';

function App() {

    const [products, setProducts] = useState([]);

    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCategory, setProductCategory] = useState('FOOD');

    function getProducts() {
        fetch('http://localhost:8080/products/all')
            .then(response => response.json())
            .then(data => {
                setProducts(data)
            });
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="App">

            <ul>
                {products.map((product, index) => {
                    return (<li key={index}>
                        {product.name} | {product.price} | {product.description}
                        <button onClick={() => {
                            fetch('http://localhost:8080/products/delete/' + product.name, {
                                method: 'DELETE'
                            }).then(response => {
                                getProducts();
                            });
                        }}>Ta Bort</button>
                    </li>);
                })}
            </ul>


            <div>

                <label>Namn</label>
                <input value={productName} onChange={event => setProductName(event.target.value)}/>
                <br/>
                <label>Beskrivning</label>
                <input value={productDescription} onChange={event => setProductDescription(event.target.value)}/>
                <br/>
                <label>Pris</label>
                <input value={productPrice} onChange={event => setProductPrice(event.target.value)}/>
                <br/>
                <label>Kategori</label>
                <select name={"categories"} value={productCategory} onChange={event => setProductCategory(event.target.value)}>
                    <option value={"FOOD"}>Food</option>
                    <option value={"DRINK"}>Drink</option>
                    <option value={"TOOL"}>Tool</option>
                    <option value={"MISC"}>Misc</option>
                </select>

                <br/>
                <button onClick={() => {

                    let price = Number.parseInt(productPrice);
                    if (Number.isNaN(price)) {
                        alert("Priset måste vara ett nummer.");
                        return;
                    }

                    fetch('http://localhost:8080/products/create', {
                        method: 'PUT',

                        headers: {
                          'Content-Type': 'application/json'
                        },

                        body: JSON.stringify({
                          name: productName,
                          description: productDescription,
                          price: price,
                          category: productCategory
                        })
                    }).then(response => {
                        getProducts();
                    });

                }}>Skapa Produkt</button>

            </div>

        </div>
    );
}

export default App;
