// Créer une liste déroulante avec ses options (choix)
function create_element(divID, numberOption, options = [], selectID) {
    let div = document.createElement("div")
    div.setAttribute('class',"mb-3")
    let parent = document.getElementById(divID)
    parent.appendChild(div)

    let select = document.createElement("select");
    select.setAttribute("id",selectID)
    select.setAttribute("class","form-select")
    select.style.display="none"
    for (let i = 0; i < numberOption; i++) {
        let option = document.createElement("option");
        
        if (options[i]=="Polystyrene 10 cm") option.value = 10
        else if (options[i]=="Polystyrene 20 cm") option.value = 20
        else if (options[i]=="Polystyrene 30 cm") option.value = 30
        else if (options[i]=="PVC Blanc 10 mm") option.value = "10#ffffff"
        else if (options[i]=="PVC Blanc 19 mm") option.value = "19#ffffff"
        else if (options[i]=="PVC Blanc 30 mm") option.value = "30#ffffff"
        else if (options[i]=="PVC Noir 10 mm") option.value = "10#ff8080"
        else if (options[i]=="PVC Noir 19 mm") option.value = "19#ff8080"
        else if (options[i]=="PVC Noir 30 mm") option.value = "30#ff8080"
        else if (options[i]=="Bois épicéa tripli 19 mm") option.value = "epicea"
        else if (options[i]=="Bois hévéa monopoli 18 mm") option.value = "bois_hevea"
        else if (options[i]=="Lichen Rouge") option.value = "lichen_rouge"
        else if (options[i]=="Lichen Vert") option.value = "lichen_vert"
        else if (options[i]=="Métal Brossé Argent 3 mm") option.value = "metal_brosse_argent"
        else if (options[i]=="Métal Brossé Or 3 mm") option.value = "metal_brosse_or"
        else if (options[i]=="Miroir 3 mm") option.value = "miroir"
        else if (options[i]=="Miroir Or 3 mm") option.value = "miroir_or"
        else if (options[i]=="Aluminium 2 mm") option.value = "aluminium"
        option.text = options[i]
        select.appendChild(option)
    }
    div.appendChild(select)
}

// Une fonction qui sert à afficher la liste en question et masquer les autres listes
function toggleSelect(id1,id2,id3,id4,id5,id6,value=""){
	document.getElementById(id1).style.display = "block";
	if (value === "polystyrene") document.getElementById(id2).style.display = "block";
	else {
		document.getElementById(id2).style.display = "none";
		height = 4
		addText(fontFamily, fontWeight, text, color, size, height, 0);
	}
	document.getElementById(id3).style.display = "none";
	document.getElementById(id4).style.display = "none";
	document.getElementById(id5).style.display = "none";
	document.getElementById(id6).style.display = "none";
	document.getElementById(id1).value=""
	
}