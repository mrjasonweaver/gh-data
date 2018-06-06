import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IssuesService } from './issues.service';
import { IIssuesObject, params, mockIssuesObject } from '../../models/issues';

xdescribe('IssuesService', () => {
  let injector: TestBed;
  let issuesTestService: IssuesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IssuesService]
    });
    injector = getTestBed();
    issuesTestService = injector.get(IssuesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([IssuesService], (issuesService: IssuesService) => {
    expect(issuesService).toBeTruthy();
  }));

  describe('#getIssues', () => {
    it('should return an Observable<IIssuesObject>', () => {

      issuesTestService.getIssues(params).subscribe(issues => {
        expect(issues.total_count).toBe(1000);
        expect(issues.items.length).toBe(2);
        expect(issues).toEqual(mockIssuesObject);
      });
      const unRepoSegments = `?q=repo:${params.username}/${params.repo}&sort=${params.sort}&order=${params.order}`;
      const queryParamsSegments = `&page=${params.page}&per_page=${params.perPage}`;

      const req = httpMock.expectOne(`${issuesTestService.url}${unRepoSegments}${queryParamsSegments}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockIssuesObject);
    });

  });
});
