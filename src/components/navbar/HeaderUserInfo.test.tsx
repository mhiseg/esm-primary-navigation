import React from 'react';
import { render, fireEvent, wait, screen } from '@testing-library/react';
import HeaderUserInfo from './HeaderUserInfo';
describe.skip('number input', () => {
  const setupInput = async () => {
    render(
        <HeaderUserInfo user={undefined} onClickChange={undefined} allowedLocales={undefined}/>
    );
    return screen.getByLabelText('number') as HTMLInputElement;
  };

  it('exists', async () => {
    const input = await setupInput();
    expect(input.type).toEqual('number');
  });

  it('can input data', async () => {
    const input = await setupInput();
    const expected = 1;

    fireEvent.change(input, { target: { valueAsNumber: expected } });
    fireEvent.blur(input);

    await wait();

    expect(input.valueAsNumber).toEqual(expected);
  });
});

describe.skip('text input', () => {
  const setupInput = async () => {
    render(
        <HeaderUserInfo user={undefined} onClickChange={undefined} allowedLocales={undefined}/>
    );
    return screen.getByLabelText('text') as HTMLInputElement;
  };

  it('exists', async () => {
    const input = await setupInput();
    expect(input.type).toEqual('text');
  });

  it('can input data', async () => {
    const input = await setupInput();
    const expected = 'Some text';

    fireEvent.change(input, { target: { value: expected } });
    fireEvent.blur(input);

    await wait();

    expect(input.value).toEqual(expected);
  });
});

describe.skip('telephone number input', () => {
  const setupInput = async () => {
    render(
        <HeaderUserInfo user={undefined} onClickChange={undefined} allowedLocales={undefined}/>
    );
    return screen.getByLabelText('telephoneNumber') as HTMLInputElement;
  };

  it('exists', async () => {
    const input = await setupInput();
    expect(input.type).toEqual('tel');
  });

  it('can input data', async () => {
    const input = await setupInput();
    const expected = '0800001066';

    fireEvent.change(input, { target: { value: expected } });
    fireEvent.blur(input);

    await wait();

    expect(input.value).toEqual(expected);
  });
});

describe.skip('date input', () => {
  const setupInput = async () => {
    render(
        <HeaderUserInfo user={undefined} onClickChange={undefined} allowedLocales={undefined}/>
    );
    return screen.getByLabelText('date') as HTMLInputElement;
  };

  it('exists', async () => {
    const input = await setupInput();
    expect(input.type).toEqual('date');
  });

  it('can input data', async () => {
    const input = await setupInput();
    const expected = '1990-09-10';

    fireEvent.change(input, { target: { value: expected } });
    fireEvent.blur(input);

    await wait();

    expect(input.value).toEqual(expected);
  });
});

describe.skip('checkbox input', () => {
  const setupInput = async () => {
    render(
        <HeaderUserInfo user={undefined} onClickChange={undefined} allowedLocales={undefined}/>
    );
    return screen.getByLabelText('checkbox') as HTMLInputElement;
  };

  it('exists', async () => {
    const input = await setupInput();
    expect(input.type).toEqual('checkbox');
  });

  it('can input data', async () => {
    const input = await setupInput();
    const expected = true;

    fireEvent.click(input);
    fireEvent.blur(input);

    await wait();

    expect(input.checked).toEqual(expected);
  });

  it('can update data', async () => {
    const input = await setupInput();
    const expected = false;

    fireEvent.click(input);
    fireEvent.blur(input);

    fireEvent.click(input);
    fireEvent.blur(input);

    await wait();

    expect(input.checked).toEqual(expected);
  });
});
