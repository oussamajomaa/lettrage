const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,1,1000);

camera.position.z = 100;
const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({ antilias: true });
renderer.setClearColor("#D1E7DD");
renderer.setSize((window.innerWidth * 70) / 100, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);
canvas.appendChild(renderer.domElement);

// declare controls to move object vertically
const controls = new THREE.OrbitControls(camera, renderer.domElement);

//make canvas responsive
window.addEventListener("resize", () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize((window.innerWidth * 70) / 100, window.innerHeight);
});

// déclarer des variables
let textGeometry;
let material;
let mesh;
let textureMesh;
let doubleMesh;
let doubleMaterial;
let doubleText;
let texture;

let fontFamily = "optimer";
let fontWeight = "regular";
let size = 60;
let height = 4;
let position = 0;
let color = new THREE.Color(0x3399ff);
let colorDouble = new THREE.Color(0x3399ff);
let text = "";
let image = "";
const loader = new THREE.FontLoader();
const textureLoader = new THREE.TextureLoader();

// ajouter un text (simple support)
function addText(fontFamily, fontWeight, text, color, size, height, position) {
	loader.load(`fonts/${fontFamily}_${fontWeight}.json`, function (font) {
		textGeometry = new THREE.TextGeometry(text, {
			font: font,
			size: size,
			height: height,
			curveSegments: 50,
			bevelEnabled: false,
			bevelThickness: 10,
			bevelSize: 8,
			bevelOffset: 0,
			bevelSegments: 5,
		});
		material = new THREE.MeshLambertMaterial({ color: color });
		mesh = new THREE.Mesh(textGeometry, material);

		// align text center
		textGeometry.computeBoundingBox();
		textGeometry.center();
		mesh.geometry.dispose();
		mesh.geometry = textGeometry;
		mesh.position.setZ(position);
		scene.add(mesh);
	});
}

// ajouter un text (double support)
function addDoubleText(fontFamily,fontWeight,text,color,size,height,position) {
	loader.load(`fonts/${fontFamily}_${fontWeight}.json`, function (font) {
		doubleText = new THREE.TextGeometry(text, {
			font: font,
			size: size,
			height: height,
			curveSegments: 50,
			bevelEnabled: false,
			bevelThickness: 10,
			bevelSize: 8,
			bevelOffset: 0,
			bevelSegments: 5,
		});
		doubleMaterial = new THREE.MeshLambertMaterial({ color: color });
		doubleMesh = new THREE.Mesh(doubleText, doubleMaterial);

		// align text center
		doubleText.computeBoundingBox();
		doubleText.center();
		doubleMesh.geometry.dispose();
		doubleMesh.geometry = doubleText;
		doubleMesh.position.setZ(position);
		scene.add(doubleMesh);
	});
}

// ajouter une textute
function loadImage(image) {
	if (image !== "") {
		texture = textureLoader.load(image);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(0.01, 0.01);
		textureMaterial = new THREE.MeshPhongMaterial({ map: texture });
		textureMesh = new THREE.Mesh(textGeometry, textureMaterial);
		scene.add(textureMesh);
	}
}

// Add shadow to object
// const light = new THREE.PointLight(0xffffff, 1, 1000);
// light.position.set(10,20,90);
// scene.add(light);

// const light = new THREE.PointLight(0xffffff, 1);
// light.position.set(10, 10, 100);
// scene.add(light);

// ********************************************************************

var light1 = new THREE.PointLight( 0xffffff, 0.5, 80 );
light1.position.set( 0, 10, 10 );
scene.add(light1);


var dirlight = new THREE.DirectionalLight( 0xffffff, 0.3 );
dirlight.position.set( 0, 10, 10 ); // the direction the light comes from
scene.add(dirlight);

// ********************************************************************

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(100, 100, 100);

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

scene.add(spotLight);


// ajouter une lumière
const AmbientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(AmbientLight);


const stats = new Stats();
const animate = () => {
	controls.update();
	stats.update();
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
};

// déclarer des variables
const fontSelect = document.getElementById("fontSelect");
const selectWeight = document.getElementById("selectWeight");
const inputText = document.getElementById("inputText");
let largeur = document.getElementById("largeur");
let longueur = document.getElementById("longueur");
let myRange = document.getElementById("myRange");
let price = document.getElementById("price");
let inputColor = document.getElementById("inputColor");
let inputColor_double = document.getElementById("inputColor_double");
let textureSelect = document.getElementById("textureSelect");

// changer la police
fontSelect.addEventListener("change", function () {
	fontFamily = this.value;
	removeMesh();
	image = "";
	if (radioValue === "double") {
		addText(fontFamily, fontWeight, text, color, size, height, 0);
		addDoubleText(fontFamily,fontWeight,text,color,size,height,height);
	} else {
		addText(fontFamily, fontWeight, text, color, size, height, position);
		loadImage(image);
	}
});

// changer l'épaisseur de la police
selectWeight.addEventListener("change", function () {
	fontWeight = this.value;
	removeMesh();
	image = "";
	if (radioValue === "double") {
		addText(fontFamily, fontWeight, text, color, size, height, 0);
		addDoubleText(fontFamily,fontWeight,text,color,size,height,height);
	} else {
		addText(fontFamily, fontWeight, text, color, size, height, position);
		loadImage(image);
	}
});

// ajouter un écouteur sur le changement de la couleur (simple support)
inputColor.addEventListener("change", function () {
	color = new THREE.Color(this.value);
	image = "";
	addText(fontFamily, fontWeight, text, color, size, height, position);
});

// ajouter un écouteur sur le changement de la couleur (double support)
inputColor_double.addEventListener("change", function () {
	colorDouble = new THREE.Color(this.value);
	image = "";
	addDoubleText(fontFamily, fontWeight, text, colorDouble, size, height, height);
});

// clear text input
inputText.addEventListener("click", function () {
	this.value = "";
	text = "";
	price.textContent = "";
	removeMesh();
});

// supprimer toutes les couches
function removeMesh() {
	for (let i = scene.children.length - 1; i >= 0; i--) {
		if (scene.children[i].type === "Mesh") scene.remove(scene.children[i]);
	}
}

// écrir dans le input
inputText.addEventListener("keyup", function () {
	text = this.value;
	inputText.value = this.value;
});

// quitter le input
inputText.addEventListener("focusout", function () {
	if (radioValue === "simple")
		addText(fontFamily, fontWeight, text, color, size, height, 0);
	if (radioValue === "double") {
		addText(fontFamily, fontWeight, text, color, size, height, 0);
		addDoubleText(fontFamily,fontWeight,text,color,size,height,height);
	}
});

// Afficher le prix selon la largeur et le longueur et le nombre de lettres
document.getElementById("getPrice").addEventListener("click", () => {
	console.log(text.length, size, height);
	price.textContent = (text.length * size * height).toFixed(2) + "€";
	price.style.display = "inherit";
});

// réinitialisation à chaque fois on clique sur la radio button
function toggleRadioButton(id1,id2){
	removeMesh();
	text=""
	inputText.value=""
	height = 4
	addText(fontFamily, fontWeight, text, color, size, height, 0);
	document.getElementById(id1).style.display = "block";
	document.getElementById(id2).style.display = "none";
}

let radioValue = "";

// cliquer sur le simple support
document.getElementById("simple_support").addEventListener("click", function () {
	toggleRadioButton("div_simple_support","div_double_support")
	radioValue = this.value;
});

// cliquer sur le double support
document.getElementById("double_support").addEventListener("click", function () {
	toggleRadioButton("div_double_support","div_simple_support")
	addText(fontFamily, fontWeight, text, color, size, height, 0);
	radioValue = this.value;
});


let type_support;
let select_simple_support = document.getElementById("select_simple_support");

// sélectionner le type de simple support
select_simple_support.addEventListener("change", function () {
	if (this.value === "lichen") {
		toggleSelect("lichen","bois","pvc","color_palette","metal_miroir","polystyrene")
	} else if (this.value === "bois") {
		toggleSelect("bois","lichen","pvc","color_palette","metal_miroir","polystyrene")
	} else if (this.value === "pvc") {
		toggleSelect("pvc","lichen","bois","color_palette","metal_miroir","polystyrene")
	} else if (this.value === "plexy" || this.value === "vinyle") {
		removeMesh();
		height = 4;
		addText(fontFamily, fontWeight, text, color, size, height, 0);
		toggleSelect("color_palette","lichen","bois","pvc","metal_miroir","polystyrene")
	} else if (this.value === "metal_miroir") {
		toggleSelect("metal_miroir","lichen","bois","pvc","color_palette","polystyrene")
	} else if (this.value === "polystyrene") {
		toggleSelect("polystyrene","color_palette","bois","pvc","lichen","metal_miroir","polystyrene")
	}
});

// créer les cinq listes déroulantes (simple support)
create_element("div_simple_support", 2, options = ["Lichen Rouge","Lichen Vert"], "lichen")
create_element("div_simple_support", 2, options = ["Bois épicéa tripli 19 mm","Bois hévéa monopoli 18 mm"], "bois")
create_element("div_simple_support", 6, options = ["PVC Blanc 10 mm","PVC Blanc 19 mm","PVC Blanc 30 mm","PVC Noir 10 mm","PVC Noir 19 mm","PVC Noir 30 mm"], "pvc")
create_element("div_simple_support", 5, options = ["Métal Brossé Argent 3 mm","Métal Brossé Or 3 mm", "Miroir 3 mm","Miroir Or 3 mm","Aluminium 2 mm"], "metal_miroir")
create_element("div_simple_support", 3, options = ["Polystyrene 10 cm","Polystyrene 20 cm","Polystyrene 30 cm"], "polystyrene")

// le choix de lichen
document.getElementById("lichen").addEventListener("change", function () {
	removeMesh();
	height = 4;
	addText(fontFamily, fontWeight, text, color, size, height, 0);
	image = `../textures/${this.value}.png`;
	loadImage(image);
});

// le choix de bois
document.getElementById("bois").addEventListener("change", function () {
	removeMesh();
	height = 4;
	addText(fontFamily, fontWeight, text, color, size, height, 0);
	image = `../textures/${this.value}.png`;
	loadImage(image);
});

// le choix de pvc
document.getElementById("pvc").addEventListener("change", function () {
	console.log(this.value.substring(0,2))
	color = this.value.substring(2);
	height = this.value.substring(0,2);
	removeMesh();
	addText(fontFamily, fontWeight, text, color, size, height, 0);
});

// le choix de metal et miroir
document.getElementById("metal_miroir").addEventListener("change", function () {
	type_support = this.value;
	removeMesh();
	image = `../textures/${this.value}.png`;
	loadImage(image);
});

// le choix de polystyrene
document.getElementById("polystyrene").addEventListener("change", function () {
	height = this.value;
	removeMesh();
	addDoubleText(fontFamily, fontWeight, text, color, size, height, 0);
});


// le choix de support arrière
document.getElementById("support_arr").addEventListener("change", function () {
	document.getElementById("support_ava").value = ""
	removeMesh();
	color = this.value;
	addText(fontFamily, fontWeight, text, color, size, 0.5, 0);
});

// le choix de support de devant
document.getElementById("support_ava").addEventListener("change", function () {
	if (this.value === "plexy") {
		removeMesh();
		addText(fontFamily, fontWeight, text, color, size, height, -height);
		document.getElementById("color_double").style.display = "block";
	} else {
		document.getElementById("color_double").style.display = "none";
		removeMesh();
		image = `../textures/${this.value}.png`;
		addDoubleText(fontFamily,fontWeight,text,color,size,height,-2.25);
		loadImage(image);
	}
});

animate();
