import { Component, OnDestroy, OnInit } from '@angular/core';
import { GithubRepository, selectProjects } from './projects/project-selection';
import { EXPERIENCES } from './experience/experience.data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Manasa Sambaraju | Software Engineer';
  year = new Date().getFullYear();
  experiences = EXPERIENCES;
  skillGroups = [
    { name: 'Programming Languages', items: ['Java 17', 'Python', 'JavaScript', 'SQL', 'HTML5', 'CSS3'] },
    { name: 'Frameworks', items: ['Spring Boot', 'React', 'Angular', 'Node.js'] },
    { name: 'Cloud / Database', items: ['Microsoft Entra External ID', 'AWS Lambda', 'Amazon S3', 'Amazon EC2', 'Amazon RDS', 'PostgreSQL', 'MongoDB'] },
    { name: 'DevOps / Infrastructure', items: ['Docker', 'Kubernetes', 'GitLab CI/CD', 'MERNA', 'FedHub'] },
    { name: 'GenAI', items: ['OpenAI', 'AWS Bedrock Agents', 'Claude', 'GitHub Copilot', 'Agent Workflows'] },
    { name: 'Tools', items: ['Splunk', 'Dynatrace', 'Bruno', 'Amazon Connect', 'Pega PRPC', 'IntelliJ IDEA'] }
  ];
  menuOpen = false;
  photoUrl = 'assets/images/manasa.jpg';
  photoVisible = true;
  photoMessage = '';
  // Add your details here when you are ready to share them publicly.
  email = 'manasasambaraju2405@gmail.com';
  github = 'https://github.com/msambaraju10?tab=repositories';
  linkedin = 'https://www.linkedin.com/in/manasa-sambaraju-7a5190162/';
  phone = '+1 6562039140';
  portfolio = '';
  resumeUrl = 'assets/resume/Manasa-Sambaraju-Resume.pdf';
  get phoneHref(): string { return 'tel:' + this.phone.replace(/[^+0-9]/g, ''); }

  closeMenu(): void { this.menuOpen = false; }

  previewPhoto(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0];
    if (!file) { return; }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) {
      this.photoMessage = 'Choose a JPG, PNG, or WebP image smaller than 5 MB.';
      input.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.photoUrl = reader.result as string;
      this.photoVisible = true;
      this.photoMessage = 'Photo preview updated. To publish it, save your image as src/assets/images/manasa.jpg.';
    };
    reader.readAsDataURL(file);
  }

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

  projectTopics(project: GithubRepository): string[] {
    return (project.topics || []).filter(topic => !/^(front-?end|back-?end)(-|$)/i.test(topic)).slice(0, 4);
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
