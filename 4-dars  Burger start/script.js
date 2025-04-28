const foods = {
    plainBurger: {
        name: "GAMBURGER",
        price: 10000,
        count: 0,
        kcall: 300,
        get calcSum() {
            return this.price * this.count;
        },
        get calcKcall() {
            return this.kcall * this.count;
        }
    },
    freshBurger: {
        name: "GAMBURGER FRESH",
        price: 20500,
        count: 0,
        kcall: 500,
        get calcSum() {
            return this.price * this.count;
        },
        get calcKcall() {
            return this.kcall * this.count;
        }
    },
    freshCombo: {
        name: "FRESH COMBO",
        price: 31900,
        count: 0,
        kcall: 600,
        get calcSum() {
            return this.price * this.count;
        },
        get calcKcall() {
            return this.kcall * this.count;
        }
    }
};

let elBtn = [...document.querySelectorAll('.main__product-btn')];
// console.log(document.querySelectorAll('.main__product-btn'));
for (let i = 0; i < elBtn.length; i++) {
    elBtn[i].addEventListener('click', function() {
        prepare(this);
    });
}

function prepare(btn) {
    let parent = btn.closest('.main__product');
    let parentId = parent.getAttribute('id');
    let number = parent.querySelector('.main__product-num');
    let price = parent.querySelector('.main__product-price span');
    let kcall = parent.querySelector('.main__product-kcall span');
    let symbol = btn.getAttribute('data-symbol');

    let count = foods[parentId].count;

    if (symbol === "+") {
        count++;
    } else if (symbol === "-" && count > 0) {
        count--;
    }

    foods[parentId].count = count;
    number.innerHTML = foods[parentId].count;
    price.innerHTML = foods[parentId].calcSum;
    kcall.innerHTML = foods[parentId].calcKcall;
}

// ** LVL Counter Animation **
const lvlCounter = document.querySelector('.header__timer-extra');
let lvl = 1;

function animateLVL() {
    if (lvl < 90) {
        lvl++;
        setTimeout(animateLVL, 50);
    } else if (lvl < 96) {
        lvl++;
        setTimeout(animateLVL, 200);
    } else if (lvl < 100) {
        lvl++;
        setTimeout(animateLVL, 700);
    }
    lvlCounter.innerHTML = lvl;
}

animateLVL();

// ** Modal View Toggle **
const productInfos = document.querySelectorAll('.main__product-info');
const viewModal = document.querySelector('.view');
const closeModal = document.querySelector('.view__close');
const modalImg = document.querySelector('.imgburger');

productInfos.forEach(info => {
    info.addEventListener('click', function () {
        let imgSrc = this.querySelector('.main__product-img').getAttribute('src');
        modalImg.setAttribute('src', imgSrc);
        viewModal.classList.add('active');
    });
});

closeModal.addEventListener('click', function () {
    viewModal.classList.remove('active');
});

// ** Order Button **
const addCart = document.querySelector('.addCart');
const receipt = document.querySelector('.receipt');
const receiptWindow = document.querySelector('.receipt__window');
const receiptWindowOut = document.querySelector('.receipt__window-out');
const receiptWindowBtn = document.querySelector('.receipt__window-btn');

addCart.addEventListener('click', () => {
    receipt.style.display = 'block';
    setTimeout(() => {
        receipt.style.opacity = '1';
        receiptWindow.style.top = '30%';
    }, 300);

    let elTitle = "<h3>Xaridingiz uchun rahmat!</h3>";
    let menu = "Sizning buyurtmangiz: <br>";
    let totalPrice = 0;
    let totalKcall = 0;

    for (const key in foods) {
        if (foods[key].count > 0) {
            menu += `${foods[key].name} - ${foods[key].count}x ${foods[key].price} sum <br>`;
            totalPrice += foods[key].calcSum;
            totalKcall += foods[key].calcKcall;
        }
    }

    receiptWindowOut.innerHTML = `${elTitle} ${menu} <br><b>Umumiy summa: ${totalPrice} sum</b><br><b>Umumiy kaloriyalar: ${totalKcall}</b>`;
});

receiptWindowBtn.addEventListener('click', (event) => {
    // location.reload();
    if(event.target == event.currentTarget) {
        receipt.style.opacity = '0';
        receiptWindow.style.top = '-100%';
        setTimeout(() => {
            receipt.style.display = 'none';
            location.reload();
        }, 500);
    }
    
});

receipt.addEventListener('click',(event)=>{
    if(event.target == event.currentTarget) {
        receipt.style.opacity = '0';
        receiptWindow.style.top = '-100%';
        setTimeout(() => {
            receipt.style.display = 'none';
            location.reload();
        }, 500);
    }
})

viewModal.addEventListener('click',(event)=>{
    if(event.target == event.currentTarget) {
        viewModal.style.display = 'none';
    
    }
})