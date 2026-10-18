const products = [
 {id:1,name:"Studio Wireless Headphones",category:"Electronics",price:2499,original:3999,rating:4.7,reviews:1248,discount:38,image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85",tag:"BESTSELLER"},
 {id:2,name:"Everyday Canvas Sneakers",category:"Fashion",price:1799,original:2499,rating:4.5,reviews:863,discount:28,image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",tag:"TRENDING"},
 {id:3,name:"Ceramic Pour-Over Set",category:"Home & Kitchen",price:899,original:1299,rating:4.6,reviews:492,discount:31,image:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=85",tag:"GOOD FIND"},
 {id:4,name:"Daily Glow Skincare Duo",category:"Beauty",price:1199,original:1699,rating:4.4,reviews:716,discount:29,image:"https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=85",tag:"EDITOR'S PICK"},
 {id:5,name:"Pocket Pro Smartphone",category:"Mobiles",price:18999,original:22999,rating:4.6,reviews:2031,discount:17,image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=85",tag:"TOP RATED"},
 {id:6,name:"The Creative Habit",category:"Books",price:499,original:699,rating:4.8,reviews:1804,discount:29,image:"https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=85",tag:"READER FAVOURITE"},
 {id:7,name:"Move Freely Yoga Mat",category:"Sports",price:999,original:1499,rating:4.5,reviews:534,discount:33,image:"https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=700&q=85",tag:"WELLNESS"},
 {id:8,name:"Minimal Desk Lamp",category:"Home & Kitchen",price:1399,original:1999,rating:4.3,reviews:381,discount:30,image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=85",tag:"DESIGN PICK"},
 {id:9,name:"Smart Fitness Watch",category:"Electronics",price:3299,original:4999,rating:4.4,reviews:992,discount:34,image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85",tag:"POPULAR"},
 {id:10,name:"Soft Knit Everyday Tee",category:"Fashion",price:699,original:999,rating:4.2,reviews:447,discount:30,image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85",tag:"EASY LAYER"},
 {id:11,name:"Compact Bluetooth Speaker",category:"Electronics",price:1599,original:2499,rating:4.6,reviews:1082,discount:36,image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=85",tag:"SOUND PICK"},
 {id:12,name:"Glass Water Bottle",category:"Sports",price:549,original:799,rating:4.3,reviews:265,discount:31,image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=700&q=85",tag:"DAILY ESSENTIAL"},
 {id:13,name:"Weekend Crossbody Bag",category:"Fashion",price:1299,original:1899,rating:4.5,reviews:622,discount:32,image:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=85",tag:"JUST IN"},
 {id:14,name:"Botanical Candle Trio",category:"Home & Kitchen",price:799,original:1099,rating:4.7,reviews:318,discount:27,image:"https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=85",tag:"COSY PICK"},
 {id:15,name:"Hydrating Face Serum",category:"Beauty",price:649,original:899,rating:4.4,reviews:574,discount:28,image:"https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=85",tag:"DAILY RITUAL"},
 {id:16,name:"Modern Classics Notebook",category:"Books",price:349,original:499,rating:4.6,reviews:209,discount:30,image:"https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=700&q=85",tag:"STATIONERY"}
];
const state = {category:"all",query:"",sort:"featured",cart:{},saved:new Set(),slide:0};
const $ = id => document.getElementById(id);
const productGrid=$("productGrid"), searchInput=$("searchInput"), searchCategory=$("searchCategory");
const formatPrice = value => "₹"+value.toLocaleString("en-IN");
function filteredProducts(){
 let list=products.filter(p=>{
  const cat=state.category==="all"||p.category===state.category;
  const q=state.query.trim().toLowerCase();
  return cat&&(!q||`${p.name} ${p.category} ${p.tag}`.toLowerCase().includes(q));
 });
 if(state.sort==="price-low")list.sort((a,b)=>a.price-b.price);
 if(state.sort==="price-high")list.sort((a,b)=>b.price-a.price);
 if(state.sort==="rating")list.sort((a,b)=>b.rating-a.rating);
 if(state.sort==="discount")list.sort((a,b)=>b.discount-a.discount);
 return list;
}
function renderProducts(){
 const list=filteredProducts();
 productGrid.innerHTML=list.map(p=>`<article class="product-card">
  <div class="product-image-wrap"><img class="product-image" src="${p.image}" alt="${p.name}" loading="lazy"><span class="discount-badge">${p.discount}% OFF</span><button class="wishlist ${state.saved.has(p.id)?"saved":""}" data-wishlist="${p.id}" aria-label="${state.saved.has(p.id)?"Remove from":"Add to"} wishlist">${state.saved.has(p.id)?"♥":"♡"}</button></div>
  <div class="product-info"><span class="product-category">${p.category}</span><h3 class="product-name">${p.name}</h3><div class="rating"><span class="stars">★★★★★</span><strong>${p.rating}</strong><span>(${p.reviews.toLocaleString("en-IN")})</span></div><div class="price-row"><strong class="price">${formatPrice(p.price)}</strong><span class="original-price">${formatPrice(p.original)}</span><span class="discount-text">${p.discount}% off</span></div><button class="add-cart" data-add="${p.id}">＋ Add to cart</button></div>
 </article>`).join("");
 $("emptyState").hidden=list.length>0;
 $("productsTitle").textContent=state.category==="all"?(state.query?`Results for “${state.query}”`:"Popular right now"):state.category;
 $("resultsText").textContent=`Showing ${list.length} ${list.length===1?"find":"finds"} picked for your everyday.`;
 $("activeFilters").innerHTML=(state.category!=="all"?`<span class="filter-pill">${state.category}<button data-clear-category aria-label="Clear category">×</button></span>`:"")+(state.query?`<span class="filter-pill">Search: ${escapeHtml(state.query)}<button data-clear-query aria-label="Clear search">×</button></span>`:"");
}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function setCategory(category,scroll=true){state.category=category;searchCategory.value=category==="all"?"all":category;renderProducts();if(scroll)$("productsSection").scrollIntoView({behavior:"smooth",block:"start"});}
function toast(message){const el=$("toast");el.textContent=message;el.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove("show"),2400);}
function addToCart(id){state.cart[id]=(state.cart[id]||0)+1;renderCart();toast(`${products.find(p=>p.id===id).name} added to your cart`);}
function cartQuantity(){return Object.values(state.cart).reduce((a,b)=>a+b,0);}
function renderCart(){
 const qty=cartQuantity();$("cartCount").textContent=qty;$("drawerCount").textContent=`(${qty})`;
 const lines=products.filter(p=>state.cart[p.id]);
 $("cartItems").innerHTML=lines.map(p=>`<div class="cart-line"><img src="${p.image}" alt=""><div><h3>${p.name}</h3><span class="line-price">${formatPrice(p.price)}</span><div class="quantity-controls"><button data-qty="${p.id}" data-change="-1" aria-label="Decrease quantity">−</button><span>${state.cart[p.id]}</span><button data-qty="${p.id}" data-change="1" aria-label="Increase quantity">+</button></div></div><button class="remove-item" data-remove="${p.id}" aria-label="Remove ${p.name}">×</button></div>`).join("");
 const total=lines.reduce((sum,p)=>sum+p.price*state.cart[p.id],0);
 $("cartSubtotal").textContent=formatPrice(total);$("cartEmpty").style.display=qty?"none":"block";$("drawerFooter").style.display=qty?"block":"none";
}
function openCart(){$("cartDrawer").classList.add("open");$("overlay").classList.add("open");$("cartDrawer").setAttribute("aria-hidden","false");document.body.style.overflow="hidden";}
function closeCart(){$("cartDrawer").classList.remove("open");$("overlay").classList.remove("open");$("cartDrawer").setAttribute("aria-hidden","true");document.body.style.overflow="";}
function showModal(title,text,action="Sounds good"){ $("modalTitle").textContent=title;$("modalText").textContent=text;$("modalAction").textContent=action;$("infoModal").hidden=false;$("overlay").classList.add("open"); }
function closeModal(){$("infoModal").hidden=true;if(!$("cartDrawer").classList.contains("open"))$("overlay").classList.remove("open");}
productGrid.addEventListener("click",e=>{
 const add=e.target.closest("[data-add]");if(add)addToCart(Number(add.dataset.add));
 const wish=e.target.closest("[data-wishlist]");if(wish){const id=Number(wish.dataset.wishlist);state.saved.has(id)?state.saved.delete(id):state.saved.add(id);renderProducts();toast(state.saved.has(id)?"Saved to your wishlist":"Removed from wishlist");}
});
$("activeFilters").addEventListener("click",e=>{if(e.target.closest("[data-clear-category]"))setCategory("all",false);if(e.target.closest("[data-clear-query]")){state.query="";searchInput.value="";renderProducts();}});
$("clearSearch").addEventListener("click",()=>{state.query="";state.category="all";searchInput.value="";searchCategory.value="all";renderProducts();});
$("searchForm").addEventListener("submit",e=>{e.preventDefault();state.query=searchInput.value;state.category=searchCategory.value;renderProducts();$("productsSection").scrollIntoView({behavior:"smooth"});});
searchInput.addEventListener("input",()=>{state.query=searchInput.value;renderProducts();});
searchCategory.addEventListener("change",()=>{state.category=searchCategory.value;renderProducts();});
$("sortSelect").addEventListener("change",e=>{state.sort=e.target.value;renderProducts();});
document.querySelectorAll("[data-category]").forEach(el=>el.addEventListener("click",()=>setCategory(el.dataset.category)));
document.querySelectorAll("[data-shop]").forEach(el=>el.addEventListener("click",()=>setCategory(el.dataset.shop)));
$("allCategories").addEventListener("click",()=>setCategory("all"));
$("cartButton").addEventListener("click",openCart);$("closeCart").addEventListener("click",closeCart);$("continueShopping").addEventListener("click",closeCart);
$("overlay").addEventListener("click",()=>{closeCart();closeModal();});
$("cartItems").addEventListener("click",e=>{
 const q=e.target.closest("[data-qty]");if(q){const id=Number(q.dataset.qty);state.cart[id]=(state.cart[id]||0)+Number(q.dataset.change);if(state.cart[id]<=0)delete state.cart[id];renderCart();}
 const rem=e.target.closest("[data-remove]");if(rem){delete state.cart[Number(rem.dataset.remove)];renderCart();}
});
$("checkoutButton").addEventListener("click",()=>showModal("You're one step away!","Checkout is simulated for this front-end assignment. Your cart is working, but no payment or order will be submitted.","Back to shopping"));
$("modalAction").addEventListener("click",closeModal);$("closeModal").addEventListener("click",closeModal);
$("locationButton").addEventListener("click",()=>{const location=prompt("Enter your delivery city or PIN code:","Bengaluru 560001");if(location&&location.trim()){$("deliveryLocation").textContent=location.trim();toast("Delivery location updated");}});
$("languageButton").addEventListener("click",()=>showModal("Choose your language","Language selection is a demo interaction. English (EN) is currently selected."));
$("accountButton").addEventListener("click",()=>showModal("Welcome to NovaCart","Sign-in is not connected in this demo. Your shopping cart and wishlist work locally during this visit.","Continue browsing"));
$("ordersButton").addEventListener("click",()=>showModal("Your orders","You haven't placed any orders in this demo yet. Complete checkout is not connected to a backend."));
$("footerAccount").addEventListener("click",e=>{e.preventDefault();showModal("Your account","Account sign-in is not connected in this demo.");});
$("footerOrders").addEventListener("click",e=>{e.preventDefault();showModal("Your orders","Order history will appear here once a backend is connected.");});
$("backToTop").addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
$("mobileMenuToggle").addEventListener("click",()=>{$("navBar").classList.toggle("open");$("mobileMenuToggle").textContent=$("navBar").classList.contains("open")?"×":"☰";});
$("newsletterForm").addEventListener("submit",e=>{e.preventDefault();const email=$("emailInput").value.trim();if(email){$("newsletterMessage").textContent=`You're on the list — thanks, ${email}!`; $("emailInput").value="";toast("Thanks for joining the Nova Note");}});
$("prevSlide").addEventListener("click",()=>setSlide(state.slide-1));$("nextSlide").addEventListener("click",()=>setSlide(state.slide+1));
$("sliderDots").querySelectorAll("button").forEach((b,i)=>b.addEventListener("click",()=>setSlide(i)));
function setSlide(index){const slides=[...document.querySelectorAll(".hero-slide")];state.slide=(index+slides.length)%slides.length;slides.forEach((s,i)=>s.classList.toggle("active",i===state.slide));$("sliderDots").querySelectorAll("button").forEach((d,i)=>d.classList.toggle("active",i===state.slide));}
let slideTimer=setInterval(()=>setSlide(state.slide+1),6500);
$("heroSlides").addEventListener("mouseenter",()=>clearInterval(slideTimer));
$("heroSlides").addEventListener("mouseleave",()=>{clearInterval(slideTimer);slideTimer=setInterval(()=>setSlide(state.slide+1),6500);});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeCart();closeModal();}});
renderProducts();renderCart();
