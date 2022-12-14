import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
declare var swal: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {
    username: null,
    email: null,
    password: null
  }

  usernames: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsernames();
  }

  onSubmit(): void{
    console.log("REGISTER")
    let validPass = false;

    let regexNum = /\d/;
    let regexSymbol = /[$-/:-?{-~!"^_`\[\]]/;

    if(!regexNum.test(this.form.password) || !regexSymbol.test(this.form.password)){
      swal({
        text: 'Contraseña mínimo 6 caracteres (con un numero y un símbolo)',
        icon: 'error',
        button: false,
        timer: 1800,
      });
      return;
    } else validPass = true

    if(!this.existUsernames() && validPass){
      this.authService.register(this.form.username, this.form.password, this.form.email)
      .subscribe(
        response => {
        console.log(response)
        swal({
          text: "Registro correcto",
          icon: "success",
          button: false,
          timer: 1000
        });
        this.router.navigate(['/login']);
      },
      error => {
        console.log(error)
        swal({
          text: "Registro incorrecto",
          icon: "error"
        });
      });
    }

  }

  private existUsernames(): boolean{
    var trobat = this.usernames.includes(this.form.username);
    if(trobat){
      swal({
        text: "Ya existe ese Username",
        icon: "error"
      });
      return true;
    }
    return false;
  }

  loadUsernames() {
    this.authService.getUsernames().subscribe(
      (response) => {
        this.usernames = response;
      },
      (error) => {
        console.log('ERROR REQUEST register/loadUsernames()');
      }
    );
  }
}
