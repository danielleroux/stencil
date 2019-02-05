import { Component, Prop, h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';


describe('hostData', () => {

  it('render hostData() attributes', async () => {
    @Component({ tag: 'cmp-a'})
    class CmpA {

      @Prop() hidden = false;

      hostData() {
        return {
          'role': 'alert',
          'aria-hidden': this.hidden ? 'true' : null,
          'hidden': this.hidden
        };
      }
    }
    // @ts-ignore
    const { root, flush } = await newSpecPage({
      components: [CmpA],
      html: `<cmp-a></cmp-a>`,
    });
    expect(root).toEqualHtml(`
      <cmp-a role="alert"></cmp-a>
    `);

    root.hidden = true;
    await flush();

    expect(root).toEqualHtml(`
      <cmp-a role="alert" aria-hidden="true" hidden></cmp-a>
    `);
  });

  it('render <host> attributes', async () => {
    @Component({ tag: 'cmp-a'})
    class CmpA {

      @Prop() hidden = false;

      render() {
        return (
          <host
            role='alert'
            aria-hidden={this.hidden ? 'true' : null}
            hidden={this.hidden}
          />
        );
      }
    }
    // @ts-ignore
    const { root, flush } = await newSpecPage({
      components: [CmpA],
      html: `<cmp-a></cmp-a>`,
    });
    expect(root).toEqualHtml(`
      <cmp-a role="alert"></cmp-a>
    `);

    root.hidden = true;
    await flush();

    expect(root).toEqualHtml(`
      <cmp-a role="alert" aria-hidden="true" hidden></cmp-a>
    `);
  });


});
