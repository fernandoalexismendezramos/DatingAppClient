import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../_models/member';
import { Pagination } from '../_models/pagination';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  members: Partial<Member[]>;
  predicate = "liked";
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination;

  constructor(private membersServices: MembersService) { }

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes(): void{
    this.membersServices.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe((response) => {
      this.members =  response.result;
      this.pagination = response.pagination;
    })
  }

  pageChaged(event: any): void {
    this.pageNumber = event.page;
    this.loadLikes();
  }

}
