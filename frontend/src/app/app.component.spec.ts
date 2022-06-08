import { TestBed } from '@angular/core/testing';
import { ChatComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ChatComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ChatComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'websocket-chat'`, () => {
    const fixture = TestBed.createComponent(ChatComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('websocket-chat');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(ChatComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('websocket-chat app is running!');
  });
});
