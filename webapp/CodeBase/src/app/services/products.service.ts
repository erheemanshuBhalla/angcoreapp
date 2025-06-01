import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment.development';
import { catchError, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  readonly BaseURI = environment.apiuUrl
  constructor(private http: HttpClient) {

  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.BaseURI +'/ProductCategory');
  }
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.BaseURI + '/Product');
  }
  getProductDetails(id: number | null): any {
    return this.http.get<any>(this.BaseURI + '/Product/'+id);
  }
  updateProduct(id: number | null, Product: any) {
    console.log(id);
    console.log(Product);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .put(this.BaseURI + '/Product/' + id, Product, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error editing product:', error);
          return throwError(() => error);
        })
      );
  }
  saveProduct(Product: any) {
    return this.http.post(this.BaseURI + '/Product', Product);
  }
}
