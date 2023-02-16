# Migrating to Lombiq Node.js Extensions

Please execute the following steps in the given order.

## Update your project file
    
1. Remove all references to `Lombiq.Gulp.Extensions` and `Lombiq.Npm.Targets`.
1. Add project and/or package references to `Lombiq.NodeJs.Extensions`.
1. In case of a project reference, you also need to manually import the _.props_ and _.targets_ files.

```diff
<Project Sdk="Microsoft.NET.Sdk.Razor">

+  <Import Condition="'$(NuGetBuild)' != 'true'" Project="..\..\Utilities\Lombiq.NodeJs.Extensions\Lombiq.NodeJs.Extensions\Lombiq.NodeJs.Extensions.props" />
+
<PropertyGroup>
    <TargetFramework>net6.0</TargetFramework>
    <AddRazorSupportForMvc>true</AddRazorSupportForMvc>
@@ -41,16 +43,16 @@
    <PackageReference Include="OrchardCore.ContentFields" Version="1.4.0" />
</ItemGroup>

-  <Import Condition="'$(NuGetBuild)' != 'true'" Project="..\..\Utilities\Lombiq.Npm.Targets\Lombiq.Npm.Targets.props" />
-  <Import Condition="'$(NuGetBuild)' != 'true'" Project="..\..\Utilities\Lombiq.Npm.Targets\Lombiq.Npm.Targets.targets" />
-
<ItemGroup Condition="'$(NuGetBuild)' != 'true'">
    <ProjectReference Include="..\..\Libraries\Lombiq.HelpfulLibraries\Lombiq.HelpfulLibraries.OrchardCore\Lombiq.HelpfulLibraries.OrchardCore.csproj" />
-    <ProjectReference Include="..\..\Utilities\Lombiq.Gulp.Extensions\Lombiq.Gulp.Extensions.csproj" />
-    <ProjectReference Include="..\..\Utilities\Lombiq.Npm.Targets\Lombiq.Npm.Targets.csproj" />
+    <ProjectReference Include="..\..\Utilities\Lombiq.NodeJs.Extensions\Lombiq.NodeJs.Extensions\Lombiq.NodeJs.Extensions.csproj" />
</ItemGroup>

<ItemGroup Condition="'$(NuGetBuild)' == 'true'">
    <PackageReference Include="Lombiq.HelpfulLibraries.OrchardCore" Version="4.7.0" />
+    <PackageReference Include="Lombiq.NodeJs.Extensions" Version="1.0.0" />
</ItemGroup>

+  <Import Condition="'$(NuGetBuild)' != 'true'" Project="..\..\Utilities\Lombiq.NodeJs.Extensions\Lombiq.NodeJs.Extensions\Lombiq.NodeJs.Extensions.targets" />
+
</Project>
```

## Configure Node.js Extensions in _package.json_

Refer to the [documentation](https://github.com/Lombiq/NodeJs-Extensions#configuration) on how to configure each part.

Asset copying needs to be manually configurated - there are no magic assets directories in Node.js Extensions anymore.

For an example of such a migration, take a look at [the pull request](https://github.com/Lombiq/Orchard-Data-Tables/pull/119/files) that contained the migration of our [Lombiq Data Tables for Orchard Core](https://github.com/Lombiq/Orchard-Data-Tables) project to Node.js Extensions, especially the following files:

- [_Gulp/paths.js_](https://github.com/Lombiq/Orchard-Data-Tables/pull/119/files#diff-e0eb38d1cb73f76b93897a0386c839af3a2046a26e34e8b9720cc051a479c05dL1)
- [_Gulp/tasks/copy-assets.js_](https://github.com/Lombiq/Orchard-Data-Tables/pull/119/files#diff-0499a158a5344045f1692884b486e90f3165f532c0987fad94c7421bee861477L4)
- [_package.json_](https://github.com/Lombiq/Orchard-Data-Tables/pull/119/files#diff-07262515c308107536d6233046a521a4263e241ac53e988609f7fd2187e75cbdR14)

## Stop tracking the _wwwroot_ folder

This includes removing any _.placeholder_ file that might exist there.

Also ensure that _wwwroot_ is added to the project's _.gitignore_ file. In the standard scenario, no files under _wwwroot_ should be committed to the repository.

## Delete _Gulpfile.js_ and any Gulp left-overs

This could be a directory of task scripts, for example.

## Delete all _node_modules_ directories

Any project using Node.js Extensions will be using PNPM for package management. In order for PNPM to properly handle packages, it is necessary to clear or delete any affected project's _node_modules_ directory.

One way to achieve the above would be to execute the following PowerShell script:

```pwsh
Get-ChildItem -Filter node_modules -Recurse | Remove-Item -Force -Recurse
```
