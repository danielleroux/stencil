import * as d from '../../declarations';
import { CompilerPlugin } from './../public';
import { plugins } from './plugins';

export let compilerPlugins: CompilerPlugin[] = plugins;

export function getConvertComponentDecoratorToStaticPlugins() {
  const plugins = getCompilerPlugins();
  return plugins.filter((p) => 'onComponentDecoratorToStatic' in p[1]);
}

export function getBeforeComponentDecoratorToStaticPlugins() {
  const plugins = getCompilerPlugins();
  return plugins.filter((p) => 'beforeComponentDecoratorToStatic' in p[1]);
}

export function getBeforePropDecoratorToStaticPlugins() {
  const plugins = getCompilerPlugins();
  return plugins.filter((p) => 'beforePropDecoratorToStatic' in p[1]);
}

export function addCompilerPluginsFromConfig(userConfig: d.StencilConfig | undefined): CompilerPlugin[] {
  const defaultPlugins = getCompilerPlugins();
  if (userConfig?.compilerPlugins && Array.isArray(userConfig.compilerPlugins)) {
    return (compilerPlugins = [...defaultPlugins, ...userConfig.compilerPlugins]);
  }
  return defaultPlugins;
}

export function getCompilerPlugins(): CompilerPlugin[] {
  return compilerPlugins;
}
