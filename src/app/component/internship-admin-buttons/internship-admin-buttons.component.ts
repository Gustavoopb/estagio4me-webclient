import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { InternshipModel } from "../../model/internship.model";
import { InternshipService } from "../../service/internship.service";
import { LoginService } from "../../service/login.service";
import { MdDialog, MdDialogRef, MdSnackBar } from "@angular/material";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import { Router } from "@angular/router";

@Component({
  selector: 'internship-admin-buttons',
  templateUrl: './internship-admin-buttons.component.html',
  styleUrls: ['./internship-admin-buttons.component.css']
})
export class InternshipAdminButtonsComponent implements OnInit {

  @Input() public internship: InternshipModel

  constructor(public internshipService: InternshipService, public loginService: LoginService, public dialog: MdDialog, public snackBar: MdSnackBar, public router: Router) { }

  ngOnInit() {
  }

  public activeIntenrship() {
    this.internship.isActive = !this.internship.isActive
    this.internshipService.update(this.internship).subscribe(res => {
      var message = this.internship.isActive ? "O estágio agora está ativo" : "O estágio agora está desativado"
      this.snackBar.open(message, "x", {
        duration: 3000,
      })
    }, err => {
      console.log(err)
    })
  }

  public openDialog() {
    let dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.internshipService.delete(this.internship).subscribe(res => {
          this.snackBar.open("Estágio removido com sucesso!", "x", {
            duration: 3000,
          })
          this.router.navigate(['/home'])
        }, err => {
          console.log(err)
        })
      }
    });
  }

  public isAdminUser() {
    return this.loginService.isAdmin()
  }

  public isLoggedIn() {
    return this.loginService.isLoggedIn()
  }
}
