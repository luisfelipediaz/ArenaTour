import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ToastController } from '@ionic/angular';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class UpdateService {

    constructor(
        updates: SwUpdate,
        private toastController: ToastController
    ) {
        updates.available.subscribe(event => {
            this.presentToast()
                .then(res => res.subscribe(accept => {
                    if (accept) {
                        updates.activateUpdate().then(() => document.location.reload());
                    }
                }));
        });
    }

    async presentToast() {
        const subject = new Subject<boolean>();
        const toast = await this.toastController.create({
            header: 'Actualización',
            message: 'Actualización disponible, ¿Desea actualizar ahora?',
            position: 'top',
            buttons: [
                {
                    text: 'Aceptar',
                    handler: () => subject.next(true)
                },
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => subject.next(false)
                }
            ]
        });

        toast.present();

        return subject as Observable<boolean>;
    }
}
