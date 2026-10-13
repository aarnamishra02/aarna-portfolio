"use strict";
const projects={
 atelier:{title:"Atelier Objects",category:"Form identity / Concept",description:"A considered product identity for a fictional homeware studio. The concept brings warm materials, generous space and a confident monogram together.",approach:"An earthy palette and elegant shapes establish a calm, tactile personality. The identity is designed to translate consistently across packaging, collections and digital touchpoints."},
 fieldnotes:{title:"Field Notes Journal",category:"Editorial / Concept",description:"An editorial concept for an independent journal exploring everyday creativity. Oversized letterforms and a lilac palette give the publication a distinctive voice.",approach:"A flexible grid balances expressive headlines with readable long-form content. Contrasting type scales create a clear hierarchy while leaving room for photography and illustration."},
 orbit:{title:"Orbit Collective",category:"Phygital design / Concept",description:"A digital identity concept for a fictional community initiative. Circular forms express connection, momentum and shared possibilities.",approach:"Forest green and lime create contrast and energy. The layout prioritizes straightforward navigation, clear calls to action and adaptable content across devices."}
};
const modal=document.getElementById("project-modal");
let opener=null;
document.querySelectorAll(".project-open").forEach(button=>button.addEventListener("click",()=>{
 const project=projects[button.dataset.project];if(!project)return;
 document.getElementById("modal-title").textContent=project.title;
 document.getElementById("modal-category").textContent=project.category;
 document.getElementById("modal-description").textContent=project.description;
 document.getElementById("modal-approach").textContent=project.approach;
 opener=button;modal.showModal();document.body.classList.add("modal-open");
}));
document.getElementById("modal-close").addEventListener("click",()=>modal.close());
modal.addEventListener("click",event=>{if(event.target===modal){const r=modal.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)modal.close();}});
modal.addEventListener("close",()=>{document.body.classList.remove("modal-open");opener?.focus();});
// Escape hides tooltip text until the next pointer/focus interaction.
const navLinks=document.querySelectorAll("nav a");
navLinks.forEach(link=>{const tip=link.querySelector(".tooltip");link.addEventListener("keydown",e=>{if(e.key==="Escape")tip.style.display="none";});["mouseenter","focus"].forEach(type=>link.addEventListener(type,()=>tip.style.removeProperty("display")));});
const form=document.getElementById("contact-form");
form.addEventListener("submit",event=>{
 event.preventDefault();let firstInvalid=null;
 for(const field of form.querySelectorAll("input,textarea")){
  field.value=field.value.trim();let error="";
  if(!field.value)error="Please complete this field.";
  else if(field.type==="email"&&!field.validity.valid)error="Please enter a valid email address.";
  else if(field.value.length<field.minLength)error=`Please enter at least ${field.minLength} characters.`;
  else if(field.value.length>field.maxLength)error=`Please use no more than ${field.maxLength} characters.`;
  field.setAttribute("aria-invalid",String(Boolean(error)));
  document.getElementById(`${field.id}-error`).textContent=error;
  if(error&&!firstInvalid)firstInvalid=field;
 }
 const status=document.getElementById("form-status");
 if(firstInvalid){status.textContent="Please correct the highlighted fields.";firstInvalid.focus();return;}
 status.textContent="Your message passes validation. This demo does not send or store messages.";
});
document.getElementById("year").textContent=new Date().getFullYear();
