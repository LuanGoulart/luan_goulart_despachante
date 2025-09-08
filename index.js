/* Detecta mobile */
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
const btn = document.querySelector(".contato-btn-mobile");
if (isMobile) btn.style.display = "block"; else btn.style.display = "none";

/* Menu de cores */
const colorMenu = document.getElementById("colorMenu");
const bg1 = document.getElementById("bgColor1");
const bg2 = document.getElementById("bgColor2");
const textInput = document.getElementById("textColor");
const iconWhatsColor = document.getElementById("iconWhatsColor");
const iconInstaColor = document.getElementById("iconInstaColor");
const iconFaceColor = document.getElementById("iconFaceColor");
const iconEmailColor = document.getElementById("iconEmailColor");

const iconWhats = document.getElementById("iconWhats");
const iconInsta = document.getElementById("iconInsta");
const iconFace = document.getElementById("iconFace");
const iconEmail = document.getElementById("iconEmail");

const defaultColors = {
    bg1:"#4facfe", bg2:"#00f2fe", text:"#ffffff",
    iconWhats:"#25D366", iconInsta:"#E1306C", iconFace:"#1877F2", iconEmail:"#D44638"
};

function toggleMenu() {
    colorMenu.style.display = colorMenu.style.display === "flex" ? "none" : "flex";
    setInputsToCurrent();
}

function setInputsToCurrent() {
    const saved = JSON.parse(localStorage.getItem("siteColors"));
    if (saved) {
        bg1.value = saved.bg1;
        bg2.value = saved.bg2;
        textInput.value = saved.text;
        iconWhatsColor.value = saved.iconWhats;
        iconInstaColor.value = saved.iconInsta;
        iconFaceColor.value = saved.iconFace;
        iconEmailColor.value = saved.iconEmail;
    } else {
        bg1.value = defaultColors.bg1;
        bg2.value = defaultColors.bg2;
        textInput.value = defaultColors.text;
        iconWhatsColor.value = defaultColors.iconWhats;
        iconInstaColor.value = defaultColors.iconInsta;
        iconFaceColor.value = defaultColors.iconFace;
        iconEmailColor.value = defaultColors.iconEmail;
    }
    updateAll();
}

function updateAll() {
    document.body.style.background = `linear-gradient(to right, ${bg1.value}, ${bg2.value})`;
    document.querySelectorAll("h1,h2,p").forEach(el => el.style.color = textInput.value);
    iconWhats.style.color = iconWhatsColor.value;
    iconInsta.style.color = iconInstaColor.value;
    iconFace.style.color = iconFaceColor.value;
    iconEmail.style.color = iconEmailColor.value;
    saveColors();
}

[bg1, bg2, textInput, iconWhatsColor, iconInstaColor, iconFaceColor, iconEmailColor].forEach(i => i.addEventListener("input", updateAll));

function resetColors() {
    bg1.value = defaultColors.bg1;
    bg2.value = defaultColors.bg2;
    textInput.value = defaultColors.text;
    iconWhatsColor.value = defaultColors.iconWhats;
    iconInstaColor.value = defaultColors.iconInsta;
    iconFaceColor.value = defaultColors.iconFace;
    iconEmailColor.value = defaultColors.iconEmail;
    updateAll();
}

function saveColors() {
    const colors = {
        bg1:bg1.value, bg2:bg2.value, text:textInput.value,
        iconWhats:iconWhatsColor.value, iconInsta:iconInstaColor.value,
        iconFace:iconFaceColor.value, iconEmail:iconEmailColor.value
    };
    localStorage.setItem("siteColors", JSON.stringify(colors));
}

window.onload = setInputsToCurrent;

/* Pix */
function copiarPixAutomatico() {
    try {
        navigator.clipboard.writeText("35 99979-2207").then(()=>{
            const msg=document.getElementById("copiedMsg");
            msg.style.display="inline";
            setTimeout(()=>{msg.style.display="none";},2000);
        }).catch(()=>{
            alert("Copie manualmente: 35 99979-2207");
        });
    }catch {
        alert("Copie manualmente: 35 99979-2207");
    }
}

/* Contato vCard */
function salvarTodosContatosNoCelular() {
    if (!isMobile) {
        alert("Essa função só funciona em celulares.");
        return;
    }
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:Luan Goulart Despachante
TEL;TYPE=CELL,VOICE;X-ABLabel=WhatsApp:+5535999792207
EMAIL:luangoulartdesp@hotmail.com
URL;TYPE=WORK,WhatsApp:https://wa.me/5535999792207
URL;TYPE=WORK,Instagram:https://www.instagram.com/luangoulartdesp
URL;TYPE=WORK,Facebook:https://www.facebook.com/despachanteluangoulart/about
ORG:Despachante Luan Goulart
END:VCARD`;
    const blob = new Blob([vCard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "luan_goulart_contato.vcf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert("Arquivo vCard baixado! Abra no celular para salvar o contato.");
}

/* Fechar instruções contato */
function fecharInstrucoes() {
    document.getElementById("instrucoesContato").style.display="none";
}
