const pName = document.getElementById('name');
const img = document.getElementById('img');
const category = document.getElementById('category');
const available = document.getElementById('available');
const price = document.getElementById('price');
const offerPrice = document.getElementById('offer-price');
const btn = document.getElementById('btn');

const notification = document.getElementById('notify');
const errorNotification = document.getElementById('notify-error');

const notify = ()=> {
    notification.style.display='block';
    setTimeout(()=> {
        notification.style.display='none';
    },3000)
}
const notifyError = ()=> {
    errorNotification.style.display='block';
    setTimeout(()=> {
        errorNotification.style.display='none';
    },3000)
}


const showProducts = ()=> {
    fetch('http://localhost:5000/products')
    .then(response => response.json())
    .then(data => console.log(data))
}




btn.addEventListener('click', (e) => {
    e.preventDefault();

    const product = {
        name: pName.value,
        img: img.value,
        category: category.value,
        available: parseInt(available.value),
        price: parseFloat(price.value),
        offerPrice: parseInt(offerPrice.value)
    }

    if(pName.value && img.value && category.value && available.value && price.value && offerPrice.value){
        fetch('http://localhost:5000/product', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(response => response.json())
            .then(data => {
                if (data.inserted) {
                    notify();
                    showProducts();
                }else{
                    notifyError();
                }
            })
    }


    pName.value='';
    img.value ='';
    category.value ='';
    available.value ='';
    price.value ='';
    offerPrice.value ='';
})
