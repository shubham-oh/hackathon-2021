import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit, OnDestroy {
  botSlug = '';
  websiteSlug = '';
  scriptURL ='';
  isForm = false;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    let {params, queryParams} = this.activatedRoute.snapshot;
    
    this.botSlug = params.botSlug;
    this.websiteSlug = params.websiteSlug;
    this.scriptURL = `https://co-static-avengers.staticso2.com/chatonce/widget.js?website_id=${this.websiteSlug}`;
    this.isForm = queryParams?.form === 'true';

    if(!this.isForm){
      if(this.botSlug){
        this.scriptURL += `&bot_id=${this.botSlug}&direct_bot=true&open=true&direct_link=true`;
      }
      else {
        this.scriptURL += `&open=true&direct_link=true`
      }
    } else {
      this.scriptURL += `&form=true`
      this.createFormArea();
    }


    this.loadWidget();
  }

  loadWidget(){
      let script = document.createElement('script');
      script.id = "co-index";
      script.src = this.scriptURL;
      script.type = 'text/javascript';
      script.async = true;
      document.getElementsByTagName('head')[0].appendChild(script);    
  }

  createFormArea(){
    // <div data-sbo-form-id="bot-d64ea7a812" style="border:1px solid; height: 400px;width: 100%;"></div>
    let div = document.createElement('div');
    div.setAttribute('data-sbo-form-id', this.botSlug);
    div.style.height = '400px';
    div.style.width = '100%';
    document.getElementById('main-content').appendChild(div);    
  }

  ngOnDestroy(){
    let element = document.getElementById('co-index');
    element.remove();
  }

}
