import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'erp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    // Auto-fill demo account
    this.loginForm.patchValue({
      username: 'admin'
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      
      // Simulate login process
      setTimeout(() => {
        this.isLoading = false;
        
        // For demo, always succeed
        console.log('Đăng nhập thành công!');
        alert('Đăng nhập thành công!');
        
        // Navigate to dashboard
        this.router.navigate(['/dashboard']);
      }, 1500);
    }
  }
} 