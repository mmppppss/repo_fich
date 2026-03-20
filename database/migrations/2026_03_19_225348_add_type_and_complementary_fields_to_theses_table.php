<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('theses', function (Blueprint $table) {
            $table->enum('document_type', ['thesis', 'degree_project', 'programming_project', 'research'])
                  ->default('thesis')
                  ->after('career_id');
            
            $table->string('github_url')->nullable()->after('advisor');
            $table->string('gitlab_url')->nullable()->after('github_url');
            $table->string('live_url')->nullable()->after('gitlab_url');
            $table->text('technologies')->nullable()->after('live_url');
            
            $table->string('institution')->nullable()->after('technologies');
            $table->string('city')->nullable()->after('institution');
            
            $table->dropColumn('file_path');
            $table->dropColumn('file_type');
            $table->dropColumn('file_size');
        });
    }

    public function down(): void
    {
        Schema::table('theses', function (Blueprint $table) {
            $table->string('file_path');
            $table->enum('file_type', ['pdf', 'tex', 'zip', 'html']);
            $table->integer('file_size')->nullable();
            
            $table->dropColumn([
                'document_type',
                'github_url',
                'gitlab_url', 
                'live_url',
                'technologies',
                'institution',
                'city',
            ]);
        });
    }
};
