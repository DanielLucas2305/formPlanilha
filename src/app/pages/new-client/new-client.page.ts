import { Component, OnInit } from '@angular/core';
import { SheetService } from 'src/app/services/sheet.service';
import { PostBody } from 'src/app/models/sheet.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.page.html',
  styleUrls: ['./new-client.page.scss'],
})

export class NewClientPage implements OnInit {
  form: FormGroup;
  isEmailValid: boolean = false;
  errorMessage: string | undefined;

  constructor(
    private postService: SheetService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      empresa: [''],
      telefone: [''],
      cnpj: [''],
      cpf: [''],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  
  readonly phoneMask: MaskitoOptions = {
    mask: ['(',/\d/,/\d/,')', ' ', /\d/,/\d/,/\d/,/\d/,/\d/,' ','-',' ',/\d/,/\d/,/\d/,/\d/],
  };
  
  readonly cnpjj: MaskitoOptions = {
    mask: [/\d/,/\d/,'.', /\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'/',/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/],
  };
  
  readonly cpff: MaskitoOptions = {
    mask: [/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/,/\d/],
  };

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

  checkEmailValidity() {
    this.isEmailValid = this.form.get('email')?.valid || false;
  }
  

  ngOnInit(): void {  }

  onSubmit() {
    // Verifica se o formulário é válido antes de prosseguir
    if (this.form.valid) {
      // Obtém os valores do formulário usando o método 'value'
      const formValues = this.form.value;

      // Envia os valores para o serviço
      this.postService.post(formValues).subscribe(
        (post) => {
          console.log(post);
          // Reinicia o formulário
          this.form.reset();
          // Voltar à página anterior
          this.router.navigate(['/home']);
        },
        (error) => {
          console.log(error);
          this.errorMessage = 'Erro ao enviar o formulário... '+(error)+' ...Por favor, tente novamente.';
        }
      );
    } else {
      // Se o formulário não for válido, pode lidar com isso de acordo com seus requisitos
      console.log('Formulário inválido. Corrija os campos antes de enviar.');
    }
  }
}