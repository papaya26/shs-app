import { TestBed, async } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let messageService: MessageService;

  const mockMatSnackBar = {
    open: jasmine.createSpy('open')
  };

  beforeEach(async(() =>
    TestBed.configureTestingModule({
      providers: [
        MessageService,
        { provide: MatSnackBar, useValue: mockMatSnackBar }
      ]
    })
      .compileComponents()
      .then(() => {
        messageService = TestBed.get(MessageService);
      })));

  it('message service should be created', () => {
    expect(messageService).toBeTruthy();
  });

  it('message service should be able to pop error message', () => {
    messageService.popError('Error!!!');
    expect(mockMatSnackBar.open).toHaveBeenCalled();
  });
});
