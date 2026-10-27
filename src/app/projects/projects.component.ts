import { Component, OnDestroy, OnInit } from '@angular/core';
import { GithubRepository, selectProjects } from './project-selection';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projects: GithubRepository[] = [];
  loading = true;
  error = '';
  private controller: AbortController;

  ngOnInit(): void { this.loadProjects(); }
  ngOnDestroy(): void { if (this.controller) { this.controller.abort(); } }

  async loadProjects(): Promise<void> {
    if (this.loading && this.controller) { return; }
    this.controller = new AbortController();
    this.loading = true;
    this.error = '';
    const timeout = setTimeout(() => this.controller.abort(), 15000);
    try {
      const repositories: GithubRepository[] = [];
      // Follow pagination so selection is not restricted to the first 100 repos.
      for (let page = 1; ; page++) {
        const response = await fetch(
          'https://api.github.com/users/msambaraju10/repos?per_page=100&type=owner&sort=updated&page=' + page,
          { signal: this.controller.signal, headers: { Accept: 'application/vnd.github+json' } }
        );
        if (!response.ok) { throw new Error('GitHub request failed'); }
        const batch = await response.json() as GithubRepository[];
        if (!Array.isArray(batch)) { throw new Error('Unexpected response'); }
        repositories.push(...batch);
        if (batch.length < 100) { break; }
      }
      this.projects = selectProjects(repositories);
    } catch (_) {
      this.error = 'Projects couldn’t load from GitHub right now. You can retry or explore my repositories directly.';
    } finally {
      clearTimeout(timeout);
      this.loading = false;
    }
  }

  repositoryUrl(project: GithubRepository): string {
    return 'https://github.com/msambaraju10/' + encodeURIComponent(project.name);
  }

  displayName(name: string): string {
    const normalized = name.replace(/[-_]+/g, ' ').trim().toLowerCase();
    if (/^react website(?: ml| main| master)?$/.test(normalized)) {
      return 'React Website';
    }
    if (/^core\s*java(?: main| master)?$/.test(normalized)) {
      return 'Student Coding Platform';
    }
    if (/^portfolio website(?: master| main)?$/.test(normalized)) {
      return 'Modular Web Application';
    }
    if (/^finance application(?: master)?$/.test(normalized)) {
      return 'Financial Operations';
    }
    return name.replace(/[-_]+/g, ' ');
  }
}
