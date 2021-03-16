import { ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import { JobAppItemComponent } from './job-app-item.component';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ApiClientService } from '../api-client.service';
import { By } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';

describe('JobAppItemComponent', () => {
  let component: JobAppItemComponent;
  let fixture: ComponentFixture<JobAppItemComponent>;
  let mockApiClientService: any;
  let mockCreateStage: any;
  let mockSaveChanges: any;
  let mockGetJobApp: any;

  beforeEach(async () => {
    mockCreateStage = jasmine.createSpyObj(['createStage']);
    mockSaveChanges = jasmine.createSpyObj(['saveChanges']);
    mockGetJobApp = jasmine.createSpyObj(['getJobApp']);
    mockApiClientService = jasmine.createSpyObj(['getAllJobApps', 'getAllJobStages']);
    // mockApiClientService.getAllJobApps.and.returnValue(of(mockJobAppsUnsorted));

    await TestBed.configureTestingModule({
      declarations: [JobAppItemComponent],
      imports: [
        RouterModule.forRoot([]),
        HttpClientTestingModule,
        MatPaginatorModule,
        MatSortModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: ApiClientService, useValue: mockApiClientService },
        // {
        //   provide: ActivatedRoute,
        //   useValue: {
        //     snapshot: {
        //       paramMap: {
        //         get: () => "new", // represents the bookId
        //       },
        //     },
        //   },
        // }
      ],
    }).compileComponents()
    // .then(() => {
    //   fixture = TestBed.createComponent(JobAppItemComponent);
    //   component = fixture.componentInstance;
    // });;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobAppItemComponent);
    component = fixture.componentInstance;
    component.jobAppForm = new FormGroup({
      position: new FormControl(''),
      company: new FormControl(''),
      description: new FormControl(''),
      appliedat: new FormControl(new Date(Date.now())),
      state: new FormControl('Passive'),
      stage: new FormControl('Applied'),
      source: new FormControl(''),
      addinfo: new FormControl(''),
      closedat: new FormControl(),
      closedreason: new FormControl(''),
    });
    component.getJobApp = () => {};
    fixture.detectChanges();
  });

  it('should create Job Item Component', () => {
    expect(component).toBeTruthy();
  });

  fit('should click save changes button with fakeAsyncccc', fakeAsync(() => {
    let buttonElement = fixture.debugElement.query(By.css('#saveBtn')).nativeElement;
    spyOn(component, 'saveChanges');
    //Trigger click event after spyOn
    tick();
    buttonElement.triggerEventHandler('click', null);
    expect(component.saveChanges).toHaveBeenCalled();
  }));  

//   it('should hide contents if show is false', () => {
//     // should be rendered initially
//     expect(fixture.debugElement.query(By.css('.header')).nativeElement).toBeTruthy();
//     //trigger change
//     const button = fixture.debugElement.query(By.css('button')).nativeElement;
//     button.click();   // this will change show to false
//     fixture.detectChanges();
//     // should not be rendered
//     expect(fixture.debugElement.query(By.css('.header')).nativeElement).toBeFalsy();
// });

  // it('should call saveChanges() when "Save Changes" is clcikt', fakeAsync(() => {
  //   const saveChangesBtn: HTMLInputElement = fixture.debugElement.query(
  //     By.css('#saveBtn')
  //   ).nativeElement;
  //   saveChangesBtn.dispatchEvent(new Event('click'));
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     expect(mockSaveChanges).toHaveBeenCalled();
  //   });
  // }));

  // it('should', fakeAsync(() => {
  //   spyOn(component, 'saveChanges');
  //   const saveChangesBtn: HTMLInputElement = fixture.debugElement.query(By.css('.saveBtn'));
  //   saveChangesBtn.click();
  //   fixture.whenStable().then(() => {
  //     expect(component.saveChanges()).toHaveBeenCalled();
  //   });
  // }));

});
