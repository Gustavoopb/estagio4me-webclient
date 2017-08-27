import * as io from 'socket.io-client'

import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { environment } from '../../environments/environment';

@Injectable()
export class WebsocketService {

  private url = environment.production ? 'https://estagio4me-server.herokuapp.com' : 'http://localhost:3000'
  private socket: SocketIOClient.Socket;

  updatedInternship(message) {
    this.socket.emit('internship-update', message);
  }

  getInternship() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('internship-list', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    })
    return observable;
  }
}
