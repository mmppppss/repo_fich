<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('theses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('career_id')->constrained()->cascadeOnDelete();
            $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();
            $table->string('title');
            $table->text('abstract')->nullable();
            $table->string('author_name');
            $table->string('advisor')->nullable();
            $table->year('year');
            $table->string('file_path');
            $table->enum('file_type', ['pdf', 'tex', 'zip', 'html']);
            $table->integer('file_size')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->text('rejection_reason')->nullable();
            $table->integer('views')->default(0);
            $table->integer('downloads')->default(0);
            $table->timestamps();

            $table->index(['status', 'year']);
            $table->index(['career_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('theses');
    }
};
