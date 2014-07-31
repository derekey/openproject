//-- copyright
// OpenProject is a project management system.
// Copyright (C) 2012-2014 the OpenProject Foundation (OPF)
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 3.
//
// OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
// Copyright (C) 2006-2013 Jean-Philippe Lang
// Copyright (C) 2010-2013 the ChiliProject Team
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
// See doc/COPYRIGHT.rdoc for more details.
//++

// TODO move to UI components
angular.module('openproject.workPackages.tabs')

.directive('workPackageChildren', [
    'I18n',
    'PathHelper',
    'WorkPackageService',
    'WorkPackagesHelper',
    '$timeout',
    function(I18n, PathHelper, WorkPackageService, WorkPackagesHelper, $timeout) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      title: '@',
      workPackage: '=',
      children: '=',
      btnTitle: '@buttonTitle',
      btnIcon: '@buttonIcon'
    },
    templateUrl: '/templates/work_packages/tabs/_work_package_children.html',
    link: function(scope, element, attrs) {
      scope.I18n = I18n;
      scope.userPath = PathHelper.staticUserPath;
      scope.workPackagePath = PathHelper.staticWorkPackagePath;
      scope.getFullIdentifier = WorkPackagesHelper.getFullIdentifier;

      var setExpandState = function() {
        scope.expand = scope.children && scope.children.length > 0;
      };

      scope.$watch('children', function() {
        setExpandState();
        scope.childrenCount = scope.children.length || 0;
      });

      scope.$watch('expand', function(newVal, oldVal) {
        scope.stateClass = WorkPackagesHelper.collapseStateIcon(!newVal);
      });

      scope.addChild = function() {
        // Temporarily go to old create view with parent_id set to currently viewed work package
        window.location = PathHelper.staticWorkPackageNewWithParentPath(scope.workPackage.props.projectId, scope.workPackage.props.id);
      }

      scope.deleteChild = function() {
        //TODO: Requires API endpoint for update work package
      }
    }
  };
}]);