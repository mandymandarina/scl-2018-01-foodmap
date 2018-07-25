window.onload = (() => {
  const seccionLogin = document.getElementById('sectionLogin');
  const seccionCenter = document.getElementById('sectionCenter');
  const seccionMuro = document.getElementById('sectionMuro');
  const inputEmailUser = document.getElementById('inputCorreo');
  const sectionProfile = document.getElementById('sectionProfile');
  const sectionRecipes = document.getElementById('sectionRecipes');
  const sectionFavorite = document.getElementById('sectionFavorite');
  inputEmailUser.value = '';
  const inputPasswordUser = document.getElementById('inputPass');
  inputPasswordUser.value = '';
  // Limpiar el textarea
 
  document.getElementsByTagName('input').value = '';
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      seccionLogin.style.display = 'none';
      seccionMuro.style.display = 'block';
      seccionCenter.style.display = 'block';

      /*
      const userLogued = firebase.auth().currentUser;
      const newUserKey = firebase.database().ref().child('users').push().key;
              firebase.database().ref(`users/${newUserKey}`).set({
                idUser: userLogued.uid,
                NameUser: userLogued.displayName,
                EmailUser: userLogued.email
              }); 
              */
      // guardamos el usuario que se ha logado en una coleccion de firebase
      // declaramos el usuario actual, el que se logó
      const userLogued = firebase.auth().currentUser;
      const userData = userLogued.email; // acá sacamos el email del usuario logado
      let userId = userLogued.uid;
      // llamamos a la coleccion que tiene los usuarios
      const allUsersRegister = firebase.database().ref('users/');
      // revisamos la coleccion en ese momento
      allUsersRegister.once('value', function(snapshot) {
        // paso a arreglo el json que trae de firebase

        // recorro ese arreglo hasta llegar a los keys de c/ usuario
        // console.log(arrayUsers)
        /*
        let compare = allUsersRegister.orderByChild("idUser").equalTo(userId).once('value',(snapshot)=>{
          let arrayUsers = Object.entries(snapshot.val());
          console.log(arrayUsers.val());
        })*/

        let arrayUsers = Object.entries(snapshot.val());
        // for (id in arrayUsers) {
        // let arrayIds = arrayUsers[id];
        // let users = arrayIds[1];
        // console.log( "el id del usuario de la coleccion es:  "+users.idUser);
        // console.log( "el id del usuario logado es:  "+userId);
        // comparamos si el email del usuario de la coleccion es el mismo que se esta logando ahora
        let result;
        let found = arrayUsers.find(item => {
          item.idUser === userId;
          return result = true;
        });

        if (result) {
          console.log('usuario ya añadido anteriormente ' + userId);
        } else {
          console.log('añadiendo usuario  ' + userId);
          const newUserKey = firebase.database().ref().child('users').push().key;
          firebase.database().ref(`users/${newUserKey}`).set({
            idUser: userLogued.uid,
            NameUser: userLogued.displayName,
            EmailUser: userLogued.email
          });
        }

        // }
        /*
        arrayUsers.forEach(idFirebase => {
          idFirebase.forEach(element => {
            if (element.EmailUser !== userData) {
              console.log("añadiendo usuario");
              const newUserKey = firebase.database().ref().child('users').push().key;
              firebase.database().ref(`users/${newUserKey}`).set({
                idUser: userLogued.uid,
                NameUser: userLogued.displayName,
                EmailUser: userLogued.email
              });
            }else{
              console.log("usuario ya añadido anteriormente");
            }  
          })
        }) 
        */
      });

      // console.log(user.uid);
      // console.log("user > "+JSON.stringify(user));
    } else {
      seccionLogin.style.display = 'block';
      seccionMuro.style.display = 'none';
      seccionCenter.style.display = 'none';
      sectionProfile.style.display = 'none';
    }
  });
});// fin de window onload

// ================SECCIONES DEL DOM=============================================
const seccionLogin = document.getElementById('sectionLogin');
const seccionCenter = document.getElementById('sectionCenter');
const seccionRegistro = document.getElementById('registroUser');
const seccionMuro = document.getElementById('sectionMuro');
// ==========================FUNCIONALIDAD LOGIN=====================================

// LOGIN CON FACEBOOK
const logFb = document.getElementById('loginFb');
logFb.addEventListener('click', () => {
  let provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithRedirect(provider).then(function(result) {
    let token = result.credential.accessToken; // se obtiene el token de OAuth de Facebook
    let user = result.user; // info del usuario logado
    console.log(user);
    // /document.getElementById("login").style.display = "none";
    // document.getElementById("center").style.display = "block";
    seccionLogin.style.display = 'none';
    seccionMuro.style.display = 'block';
    seccionCenter.style.display = 'block';
  }).catch(function(error) {
    seccionLogin.style.display = 'block';
    seccionMuro.style.display = 'none';
    seccionCenter.style.display = 'none';
  });
});// fin evento click del boton login Facebook

// LOGIN CON GOOGLE
const logGoogle = document.getElementById('loginGm');
logGoogle.addEventListener('click', () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider).then(function(result) {
    let token = result.credential.accessToken; // se obtiene el token de OAuth de google
    let user = result.user; // info del usuario logado
  }).catch(function(error) {
    seccionLogin.style.display = 'block';
    seccionMuro.style.display = 'none';
    seccionCenter.style.display = 'none';
  });
});// fin evento click del boton login Google  


// LOGARSE CON EMAIL NORMAL
const btnLogin = document.getElementById('btnLogin');
btnLogin.addEventListener('click', () => {
  const emailUser = document.getElementById('inputCorreo').value;
  const passwordUser = document.getElementById('inputPass').value;
  firebase.auth().signInWithEmailAndPassword(emailUser, passwordUser)

    .catch((error) => {
      const inputEmailUser = document.getElementById('inputCorreo');
      inputEmailUser.value = '';
      const inputPasswordUser = document.getElementById('inputPass');
      inputPasswordUser.value = '';
      const alertLogin = document.getElementById('alertPassword');
      const msjErrorFirebase = error.message;
      if (msjErrorFirebase === 'The email address is badly formatted.') {
        alertLogin.innerHTML = '<div class="alert alert-danger alertConteiner" role="alert"> Error: Por favor ingresa un correo eléctronico válido</div>';
      } else if (msjErrorFirebase === 'The password is invalid or the user does not have a password.') {
        alertLogin.innerHTML = '<div class="alert alert-danger alertConteiner" role="alert"> Error: Password Invalido, Ingrese un password de 6 o más caracteres </div>';
      }
      console.log('Error de Firebase > ' + error.code);
      console.log('Error de Firebase > mensaje' + error.message);
    });
}); // fin evento click del boton login normal  

const inputEmailUser = document.getElementById('inputCorreo');
inputEmailUser.addEventListener('click', () => {
  inputEmailUser.value = '';
  const alertLogin = document.getElementById('alertPassword');
  alertLogin.innerHTML = '<div id="alertPassword"></div>';
});
const inputPasswordUser = document.getElementById('inputPass');
inputPasswordUser.addEventListener('click', () => {
  inputPasswordUser.value = '';
  const alertLogin = document.getElementById('alertPassword');
  alertLogin.innerHTML = '<div id="alertPassword"></div>';
});
// LINK A FORMULARIO PARA REGISTRAR NUEVO USUARIO
const btnFormRegister = document.getElementById('registrate');
btnFormRegister.addEventListener('click', () => {
  seccionRegistro.style.display = 'block';
  seccionLogin.style.display = 'none';
  seccionCenter.style.display = 'none';
});
// LINK PARA REGRESAR A LA SECCION DE LOGIN
const btnReturnLogin = document.getElementById('loginBack');
btnReturnLogin.addEventListener('click', () => {
  seccionLogin.style.display = 'block';
  seccionCenter.style.display = 'none';
  seccionRegistro.style.display = 'none';
  const alertReg = document.getElementById('alertRegister');
  alertReg.innerHTML = '<div id="alertPassword"></div>';
});

// REGISTRO DE USUARIO NUEVO
const btnRegister = document.getElementById('btnRegistrarse');

btnRegister.addEventListener('click', () => {
  const checkbox = document.getElementById('aceptTerm');
  console.log(checkbox.value);
  const alertReg = document.getElementById('alertRegister');
  alertReg.innerHTML = '<div id="alertPassword"></div>';

  const nombreNewUser = document.getElementById('inputName').value;
  const emailNewUser = document.getElementById('inputEmailUser').value;
  const passNewUser = document.getElementById('inputPassUser').value;

  const inputNombreNewUser = document.getElementById('inputName');
  inputNombreNewUser.value = '';
  const inputEmailNewUser = document.getElementById('inputEmailUser');
  inputEmailNewUser.value = '';
  const inputPassNewUser = document.getElementById('inputPassUser');
  inputPassNewUser.value = '';

  if (checkbox.value === 'off') {
    alertRegister.innerHTML = '<div class="alert alert-danger alertConteiner" role="alert">Tiene que aceptar los Terminos y Condiciones de Uso </div>';
  } else {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const currentUser = firebase.auth().currentUser;
        const newUserKey = firebase.database().ref().child('users').push().key;
        firebase.database().ref(`users/${newUserKey}`).set({
          NameUser: nombreNewUser,
          EmailUser: emailNewUser
        });
      }
    });
    firebase.auth().createUserWithEmailAndPassword(emailNewUser, passNewUser)
      .then(() => {
        console.log('Usuario Registrado');
        seccionLogin.style.display = 'none';
        seccionCenter.style.display = 'block';
        seccionRegistro.style.display = 'none';
      })
      .catch((error) => {
        seccionLogin.style.display = 'none';
        seccionCenter.style.display = 'none';
        seccionRegistro.style.display = 'block';
        alertRegister.innerHTML = `<div class="alert alert-danger alertConteiner" role="alert"> ${error} </div>`;
        console.log('Error de Firebase > ' + error.code);
        console.log('Error de Firebase > mensaje' + error.message);
      });
  }
});
const checkbox = document.getElementById('aceptTerm');
checkbox.addEventListener('click', () => {
  checkbox.value = 'on';
  const alertReg = document.getElementById('alertRegister');
  alertReg.innerHTML = '<div id="alertPassword"></div>';
});
/** ******************BOTON ELIMINAR MENSAJE *********************************************/

Window.confirmar = (()=>{
  const confirm = document.getElementById('confirm');
  confirm.style.display = 'block';
  const cancelar = document.getElementById('confirmCancelar');
  const aceptar = document.getElementById('confirmConfirmar');
  cancelar.addEventListener('click', () => {
    confirm.style.display = 'none';
  });                          
  aceptar.addEventListener('click', function(event) {
    deleteButtonClicked(event);
    confirm.style.display = 'none';
  });
});

/** ******************SECCION PERFIL *********************************************/
const sectionProfile = document.getElementById('sectionProfile');

const btnProfile = document.getElementById('nameIconFooterProfile');
btnProfile.addEventListener('click', () => {
  seccionLogin.style.display = 'none';
  seccionCenter.style.display = 'none';
  sectionRecipes.style.display = 'none';
  sectionProfile.style.display = 'block';
  sectionFavorite.style.display = 'none';
});

/** ******************FIN SECCION PERFIL *********************************************/


/** ******************SECCION VOLVER ATRAS PERFIL ****************************/
const btnArrowProfile = document.getElementById('btnArrowProfile');
btnArrowProfile.addEventListener('click', () => {
  sectionProfile.style.display = 'none';
  seccionLogin.style.display = 'none';
  sectionRecipes.style.display = 'none';
  seccionCenter.style.display = 'block'; 
  sectionFavorite.style.display = 'none';
});


/** ******************FIN SECCION VOLVER ATRAS PERFIL ****************************/

/** ******************SECCION RECETAS **************************************/
const sectionRecipes = document.getElementById('sectionRecipes');

const btnRecipes = document.getElementById('nameIconFooterRecipes');
btnRecipes.addEventListener('click', () => {
  sectionProfile.style.display = 'none';
  seccionLogin.style.display = 'none';
  seccionCenter.style.display = 'none';
  sectionRecipes.style.display = 'block';
  sectionFavorite.style.display = 'none';
});
/** ******************FIN SECCION RECETAS*******************************************/


/** ******************SECCION VOLVER ATRAS RECETAS *************************/

const btnArrowRecipes = document.getElementById('btnArrowRecipes');
btnArrowRecipes.addEventListener('click', () => {
  sectionProfile.style.display = 'none';
  seccionLogin.style.display = 'none';
  seccionCenter.style.display = 'block';
  sectionRecipes.style.display = 'none';
  sectionFavorite.style.display = 'none';
});
/** ******************FIN SECCION VOLVER ATRAS RECETAS ****************************/

/** ******************SECCION FAVORITOS **************************************/
const sectionFavorite = document.getElementById('sectionFavorite');

const btnFavorite = document.getElementById('nameIconFooterFavourite');
btnFavorite.addEventListener('click', () => {
  sectionProfile.style.display = 'none';
  seccionLogin.style.display = 'none';
  seccionCenter.style.display = 'none';
  sectionRecipes.style.display = 'none';
  sectionFavorite.style.display = 'block';
});
/** ******************FIN SECCION FAVORITOS****************************************/


/** ******************SECCION VOLVER ATRAS FAVORITOS*************************/

const btnArrowFavorite = document.getElementById('btnArrowFavorite');
btnArrowFavorite.addEventListener('click', () => {
  sectionProfile.style.display = 'none';
  seccionLogin.style.display = 'none';
  seccionCenter.style.display = 'block';
  sectionRecipes.style.display = 'none';
  sectionFavorite.style.display = 'none';
});
/** ******************FIN SECCION VOLVER ATRAS FAVORITOS****************************/