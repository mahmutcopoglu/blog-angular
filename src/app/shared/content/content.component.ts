import { Component, OnInit } from '@angular/core';
import { ContentService } from '../services/content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this.contentService.getPosts().subscribe(
      (response) => {
        console.log(response)
      }
    )
  }

}
