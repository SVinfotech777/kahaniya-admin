import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  
  displayedColumns: string[] = ['position', 'name', "actions"];
  dataSource: any[] = [];
  isShow: boolean = false;

  constructor(public httpService: HttpServiceService) {

  }

  async ngOnInit() {
    this.dataSource = await this.httpService.readCategoriesFromDb();
    this.dataSource.forEach((element, index) => {
      element.position = index + 1;
    });
    console.log('this.dataSource: ', this.dataSource);
    this.isShow = true;
  }

  viewStories(element: any) {
    console.log('element: ', element);
  }

}
