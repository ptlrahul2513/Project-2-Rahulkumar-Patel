export default function InventoryForm({formData, handleOnChange}){
    return(
    <div>
        <form action="">
            <div>
                <label htmlFor="productName">Product Name</label>
                <input type="text"
                 name="productName" 
                 id="productName"
                  onChange={handleOnChange}
                  value={FormData.productName}
                   />


            </div>
            <div>
                <label htmlFor="brand">Brand</label>
                <input type="text" 
                name="brand" 
                id="brand"
                 onChange={handleOnChange}
                  value={formData.brand}
                  />
            </div>
            <div>
                <label htmlFor="quantity">Quantity </label>
                <input type ="text" 
                name="quantity"
                id="quantity"
                onChange={handleOnChange} 
                value={formData.quantity}
                />
            </div>
            <div>
                <label htmlFor="image">Image URL </label>
                <input type="text" name="image"
                id="image"
                onChange={handleOnChange}
                value={formData.image}
            />
            </div>
            <div>
                <label htmlFor="price">Price </label>
                <input type="text"
                name="price"
                id="price"
                onChange={handleOnChange}
                value={formData.price}
            />
            </div>
            <button>Add to inventory</button>

            </form>
    </div>
    );
}