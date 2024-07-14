let postsArray = []
let postObject = {}
let counter = 0
let td = []
let totalPrice = 0
let totalWeight = 0
let totalNetPrice = 0
let totalMaterialPrice = 0
let res = document.getElementById('result')
let gettingItems = document.getElementById('getting-item')
let search = document.getElementById('search')
let count = document.getElementById('times')

document.getElementById('submit-button').addEventListener('click',()=>{
    // let search = document.getElementById('search').value
    // let count = document.getElementById('times').value
    let newPrice = document.getElementById('newprice')
    if(search.value != '' && count.value != ''){
        fetch('products.json').then( res => {
            if(res.ok){
                return res.json()
            }
            else{
                throw Error('Failed to fetch')
            }
        })    
        .then(posts => {
            posts.forEach((post) => {
                if(search.value == post.code){
                    if(newPrice.value != ''){
                        postObject = {
                            name: post.name,
                            code: post.code,
                            pricePerEach: newPrice.value,
                            totalPrice: newPrice.value * count.value,
                            totalMaterialPrice: post.material * count.value * post.weight,
                            totalWeight: post.weight * count.value,
                            netPrice: (newPrice.value * count.value) - (post.material * post.weight * count.value),
                            count: count.value
                        }
                    }
                    else{
                        postObject = {
                            name: post.name,
                            code: post.code,
                            pricePerEach: post.price,
                            totalPrice: post.price * count.value,
                            totalMaterialPrice: post.material * count.value * post.weight,
                            totalWeight: post.weight * count.value,
                            netPrice: (post.price * count.value) - (post.material * post.weight * count.value),
                            count: count.value
                        }
                    }
                    postsArray.push(postObject)
                    console.log(postsArray)
                    search.value = ''
                    count.value = ''
                    newPrice.value = ''
                }
            });
        })
    }
    else{
        alert('Ø§ÛŒÙ†Ù¾ÙˆØª Ù‡Ø§Ø±Ø§ Ù¾Ø± Ú©Ù†ÛŒØ¯')
    }
 
    counter = counter + 1 
})
document.getElementById('back-button').addEventListener('click',()=>{
    postsArray.pop()
    console.log(postsArray)
})
document.getElementById('end-button').addEventListener('click',()=>{
    res.style.display = 'block'
    gettingItems.style.display = 'none'

    for (let i = 0; i < postsArray.length; i++) {
        let tr = document.createElement('tr');
        let tdCount = 0; // Counter variable for td elements

        for (let key in postsArray[i]) {
            let td = document.createElement('td');
            td.innerHTML = postsArray[i][key];
            tr.appendChild(td);

            // Add class to 4th td in each tr
            if (tdCount === 3) {
                td.classList.add('totalprice');
            }
            if (tdCount === 4) {
                td.classList.add('totalmaterialprice');
            }        
            if (tdCount === 5) {
                td.classList.add('totalweight');
            }
            if (tdCount === 6) {
                td.classList.add('netprice');
            }            
            tdCount++; // Increment td counter
        }
        document.getElementById('table').appendChild(tr);
    }
    for(let i = 0; i < postsArray.length; i++) {
        let totalPriceItems = document.querySelectorAll('.totalprice');
        totalPrice = parseFloat(totalPriceItems[i].innerHTML) + parseFloat(totalPrice)

        let totalMaterialPriceItems = document.querySelectorAll('.totalmaterialprice');
        totalMaterialPrice = parseFloat(totalMaterialPriceItems[i].innerHTML) + parseFloat(totalMaterialPrice)
        
        let totalweightItems = document.querySelectorAll('.totalweight');
        totalWeight = parseFloat(totalweightItems[i].innerHTML) + parseFloat(totalWeight)

        let totalNetPriceItems = document.querySelectorAll('.netprice');
        totalNetPrice = parseFloat(totalNetPriceItems[i].innerHTML) + parseFloat(totalNetPrice)
    }
    
    document.getElementById('totalprice').innerHTML = totalPrice + ': Ù‚ÛŒÙ…Øª Ú©Ù„ '
    document.getElementById('totalweight').textContent = totalWeight + ': ÙˆØ²Ù† Ú©Ù„ '
    document.getElementById('netprice').innerHTML = totalNetPrice + ': Ù‚ÛŒÙ…Øª Ø®Ø§Ù„Øµ Ú©Ù„ '
    document.getElementById('totalmaterialprice').innerHTML = totalMaterialPrice + ': Ù‚ÛŒÙ…Øª Ù…ÙˆØ§Ø¯ Ù…ØµØ±ÙÛŒ Ú©Ù„ '

})
function newprice (x){
    return x
}
