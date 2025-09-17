import { CompilerPlugin } from '../public';
import { styleToStatic } from '../transformers/decorators-to-static/style-to-static';
import { convertValueToLiteral, createStaticGetter } from '../transformers/transform-utils';

const ComponentDecoratorToStatic = (): CompilerPlugin => {
  return [
    'stencil-core-component-decorator-to-static',
    {
      onComponentDecoratorToStatic: ({ additionalCompilerContext: { classMembers } }, { componentOptions }) => {
        classMembers.push(createStaticGetter('is', convertValueToLiteral(componentOptions.tag.trim())));

        if (componentOptions.shadow) {
          classMembers.push(createStaticGetter('encapsulation', convertValueToLiteral('shadow')));

          if (typeof componentOptions.shadow !== 'boolean') {
            if (componentOptions.shadow.delegatesFocus === true) {
              classMembers.push(createStaticGetter('delegatesFocus', convertValueToLiteral(true)));
            }
          }
        } else if (componentOptions.scoped) {
          classMembers.push(createStaticGetter('encapsulation', convertValueToLiteral('scoped')));
        }

        if (componentOptions.formAssociated === true) {
          classMembers.push(createStaticGetter('formAssociated', convertValueToLiteral(true)));
        }

        styleToStatic(classMembers, componentOptions);

        const assetsDirs = componentOptions.assetsDirs || [];

        if (assetsDirs.length > 0) {
          classMembers.push(createStaticGetter('assetsDirs', convertValueToLiteral(assetsDirs)));
        }
      },
    },
  ];
};

export const plugins = [ComponentDecoratorToStatic()];
