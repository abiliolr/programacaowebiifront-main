import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Optional: Check role if data attached to route
    const expectedRole = route.data['expectedRole'];
    if (expectedRole) {
        const userRole = this.authService.getRole();
        // Simple check: if expectedRole is 'PROFESSOR', userRole must be 'PROFESSOR'
        // Ideally handle array of roles or hierarchy
        if (userRole !== expectedRole && userRole !== 'ADMIN') { // Admin usually can access all
            // Redirect to home or error if role doesn't match
             this.router.navigate(['/home']); // or unauthorized page
             return false;
        }
    }

    return true;
  }
}
