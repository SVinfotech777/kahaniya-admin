import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-stories-list',
  templateUrl: './stories-list.component.html',
  styleUrls: ['./stories-list.component.scss']
})
export class StoriesListComponent {
  storiesList: any[] = [];
  categoryData: any;
  displayedColumns: string[] = ['position', 'name', "timestamp"];
  isShow: boolean = false;
  catId: any = '';

  constructor(private route: ActivatedRoute, private httpService: HttpServiceService) {
    
  }

  async ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.catId = routeParams.get('categoryId');
    console.log('this.catId: ', this.catId);
    if(!this.catId) return;

    // get specific category data
    this.categoryData = await this.httpService.getSpecificCategoryData(this.catId);
    console.log('this.categoryData: ', this.categoryData);

    // get stories list from database
    this.storiesList = await this.httpService.getSpecificCatStoriesList(this.catId);
    console.log('this.storiesList: ', this.storiesList);
    this.isShow = true;
  }
} 
