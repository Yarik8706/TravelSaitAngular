import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

export interface News {
  text: string,
  allText: string,
  title: string,
  time: NgbDateStruct,
  img: {src, name, size}
}
