import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenService } from '../../../services/token.service';
import { AuthStateService } from '../../../services/auth-state.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    errors = null;

    constructor(
        public router: Router,
        public fb: FormBuilder,
        public authService: AuthService,
        private token: TokenService,
        private authState: AuthStateService
    ) {
        this.loginForm = this.fb.group({
            email: [], // sets formControlName
            password: [], // sets formControlName
        });
    }

    ngOnInit() {}

    /* triggers on login, calls auth service */
    onSubmit() {
        this.authService.signin(this.loginForm.value).subscribe(
            (result) => {
                this.responseHandler(result);
            },
            (error) => {
                this.errors = error.error;
            },
            () => {
                this.authState.setAuthState(true);
                this.loginForm.reset();
                this.router.navigate(['swipe']);
            }
        );
    }

    // Handle response
    responseHandler(data) {
        this.token.handleData(data.access_token);
    }
}
